import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/adminOrders.css'

const AdminOrders = () => {
    const {user} = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch('/api/orders', {
                headers: {Authorization: `Bearer ${user.token}`}
            })
            const data = await res.json()
            setOrders(Array.isArray(data) ? data : [])
        }
        fetchOrders()
    }, [user])

    const handleUpdateStatus = async (id, updatedStatus) => {
        const res = await fetch(`/api/orders/${id}/status`, {
            method: 'PUT', 
            headers: {'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`},
            body: JSON.stringify({status: updatedStatus})
        })
        if(res.ok){
            const { order: updatedOrder } = await res.json()
            setOrders(currentOrders => currentOrders.map(order =>
                order._id === id ? { ...order, status: updatedOrder.status } : order
            ))
        } else {
            const error = await res.json().catch(() => ({}))
            alert(error.message || 'Unable to update the order status.')
        }
    }

  return (
    <div className='admin-orders-container'>
        <h2 className='manage-orders-heading'>Manage Orders</h2>
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-heading'>ORDER ID</th>
                        <th className='table-heading'>USER</th>
                        <th className='table-heading'>TOTAL</th>
                        <th className='table-heading'>DATE</th>
                        <th className='table-heading'>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className='table-row'>
                            <td className='table-data'>{order._id.substring(0, 8)}...</td>
                            <td className='table-data'>{order.user?.name || 'Deleted User'}</td>
                            <td className='table-data'>₹{order.totalAmount.toFixed(2)}</td>
                            <td className='table-data'>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className='table-data'>
                                <select value={order.status} onChange={(e) => handleUpdateStatus(order._id, e.target.value)} className='handle-update-status'>
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminOrders
