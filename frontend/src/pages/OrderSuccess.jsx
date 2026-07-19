import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/orderSuccess.css'

const OrderSuccess = () => {
  return (
    <div className='ordersuc-container'>
      <h2 className='payment-success'>Payment Successful!</h2>
      <p className='payment-message'>
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link to="/shop" className="btn">Continue Shopping</Link>
    </div>
  )
}

export default OrderSuccess