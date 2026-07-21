import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/profile.css'

const Profile = () => {
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!user){
            navigate('/login')
            return
        }
        const fetchMyOrders = async () => {
            try {
                const res = await fetch('/api/orders/myorders', {
                    headers: {Authorization: `Bearer ${user.token}`}
                })
                const data = await res.json()
                if(res.ok){
                    setOrders(Array.isArray(data) ? data : [])
                } else {
                    if(res.status === 401){
                        logout()
                        navigate('/login')
                    }
                    setOrders([]);
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMyOrders()
    }, [user, navigate, logout])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if(!user) return null;

  const userRole = user?.role ? user.role.toUpperCase() : 'USER'

  return (
    <div className='profile-container'>
        <div className='profile-contain'>
            <div>
                <h2 className='my-profile'>My Profile</h2>
                <p className='name'><strong>Name:</strong> {user.name}</p>
                <p className='email'><strong>Email:</strong> {user.email}</p>
                <span className='badge'>Account Type: {userRole}</span>
            </div>
            <button onClick={handleLogout} className='btn'>Logout</button>
        </div>

        <h3 className='order-history'>Order History</h3>
        {loading ? (
            <p className='fetch-orders'>Fetching orders...</p>
        ) : orders.length === 0 ? (
            <div className='no-order'>
                <p className='no-order-display'>You haven't placed any orders yet.</p>
                <Link to="/shop" className='btn'>Start Shopping</Link>
            </div>
        ) : (
            <div className='orders-map'>
                {orders.map(order => (
                    <div className='order-box'>
                        <div>
                            <p className='order-id'>Order ID: <span className='oid'>{order._id}</span></p>
                            <p className='place-on'>Placed On: <span className='order-place'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                            <p className='total'>Total: <strong className='total-price'>₹{order.totalAmount.toFixed(2)}</strong></p>
                        </div>
                        <div>
                            <span style={{ 
                  background: order.status === 'Delivered' ? 'rgba(16,185,129,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', 
                  color: order.status === 'Delivered' ? '#10b981' : order.status === 'Shipped' ? '#3b82f6' : '#f59e0b',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                }}>
                  {order.status}
                </span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Profile
