import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cartSlice'
import '../styles/checkout.css'

const Checkout = () => {
    const {user} = useContext(AuthContext)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState({
        fullName: '', street: '', city: '', postalCode: '', country: ''
    })
    const [paymentError, setPaymentError] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const saveOrder = async (paymentId) => {
        const saveOrderRes = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                items: cartItems.map(({ productId, qty, price }) => ({
                    productId,
                    quantity: qty,
                    price
                })),
                totalAmount: totalPrice,
                address,
                paymentId
            })
        })

        if (!saveOrderRes.ok) {
            const data = await saveOrderRes.json().catch(() => ({}))
            throw new Error(data.message || 'Order could not be saved.')
        }

        dispatch(clearCart())
        navigate('/ordersuccess')
    }

    const handlePayment = async () => {
        setPaymentError('')
        setIsProcessing(true)
        try {
            const orderRes = await fetch('/api/payment/order', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({amount: totalPrice})
            })
            const orderData = await orderRes.json()

            if(!orderRes.ok) {
                const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?")
                if(fallback) {
                    await bypassPayment()
                    return
                } else {
                    throw new Error(orderData.message || 'Payment failed to initialize.')
                }
            }

            if (!window.Razorpay) {
                throw new Error('The payment service did not load. Please check your connection and try again.')
            }

            const options = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Netra",
                description: 'Test Transaction',
                order_id: orderData._id,
                handler: async function (response) {
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(response)
                        })
                        if (!verifyRes.ok) throw new Error('Payment verification failed.')

                        await saveOrder(response.razorpay_payment_id)
                    } catch (error) {
                        setPaymentError(error.message || 'We could not complete your payment.')
                        setIsProcessing(false)
                    }
                },
                prefill: {
                    name: address.fullName,
                    email: user?.email,
                    contact: '9999999999'
                },
                theme: {
                    color: '#f97316'
                },
                modal: {
                    ondismiss: () => setIsProcessing(false)
                }
            }

            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.error(error)
            setPaymentError(error.message || 'We could not start the payment. Please try again.')
            setIsProcessing(false)
        }
    }

    const bypassPayment = async () => {
        await saveOrder(`student_test_${Date.now()}`)
    }

    const handleStudentPayment = async () => {
        if (!cartItems.length) {
            setPaymentError('Your cart is empty. Add an item before placing a test order.')
            return
        }
        if (!user) {
            window.alert('Please login first to continue with payment.')
            navigate('/login')
            return
        }

        setPaymentError('')
        setIsProcessing(true)
        try {
            await bypassPayment()
        } catch (error) {
            console.error(error)
            setPaymentError(error.message || 'The test order could not be created.')
            setIsProcessing(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!cartItems.length) {
            setPaymentError('Your cart is empty. Add an item before paying.')
            return
        }
        if(!user) {
            window.alert('Please login first to continue with payment.')
            navigate('/login')
            return;
        }
        handlePayment()
    }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            <button type="button" className="student-payment-btn" onClick={handleStudentPayment} disabled={isProcessing}>
              Student Test Payment
            </button>
          </div>
          <p className="student-payment-note">Test mode only: no card is charged. It creates an order for your signed-in account.</p>
          {paymentError && <p className="payment-error" role="alert">{paymentError}</p>}
        </form>
      </div>
    </div>
  )
}

export default Checkout
