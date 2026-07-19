import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, setCartQuantity } from '../redux/cartSlice'
import '../styles/cart.css'

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleUpdateQty = (productId, qty) => {
        if(qty > 0) {
            dispatch(setCartQuantity({ productId, qty }))
        }
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <div className='cart-container'>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
        ) : (
            <div className='cart-layout'>
                <div className='cart-items'>
                    {cartItems.map((item) => (
                        <div key={item.productId} className='cart-item'>
                            <img src={item.imageUrl} alt={item.name} className='cart-item-image' />
                            <div className='cart-item-details'>
                                <h4>{item.name}</h4>
                                <p>Rs.{item.price}</p>
                                <div className='qty-controls'>
                                    <button
                                        onClick={() => handleUpdateQty(item.productId, item.qty - 1)}
                                        disabled={item.qty <= 1}
                                        aria-label={`Decrease quantity of ${item.name}`}
                                    >-</button>
                                    <span>{item.qty}</span>
                                    <button
                                        onClick={() => handleUpdateQty(item.productId, item.qty + 1)}
                                        aria-label={`Increase quantity of ${item.name}`}
                                    >+</button>
                                </div>
                                <button onClick={() => handleRemove(item.productId)} className='btn-remove'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='cart-summary'>
                    <h3>Total: Rs{totalPrice.toFixed(2)}</h3>
                    <button onClick={() => navigate('/checkout')} className='btn-checkout'>Proceed to Checkout</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Cart
