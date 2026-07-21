import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/admin.css'

const AdminDashboard = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)

    

    useEffect(() => {
        if(!user || user.role !== 'admin'){
            navigate('/')
            return;
        }
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/analytics', {
                    headers: {Authorization: `Bearer ${user.token}`}
                })
                const data = await res.json()
                console.log('Analytics response:', res.status, data)
                if(res.ok) {
                    setStats(data)
                } else {
                    console.error('Analytics fetch failed:', data.message)
                    if(res.status === 401) {
                        navigate('/login')
                    } 
                    setStats({totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0})
                }
            } catch (error) {
                console.error('Analytics error:', error)
            } 
        }
        fetchStats();
    }, [user, navigate])

  return (
    <div className='dashboard-container'>
        <div className='container-style'>
            <img src="/favicon.png" alt="Logo" className='logo-container' />
            <h2 className='admin-dashboard'>Admin Dashboard</h2>
        </div>
        <p className='welcome'>Welcome back, <span className='name'>{user?.name}</span></p>

        {stats ? (
            <div className='contents'>
            <div className='cardStyle'>
                <h4>Total Orders</h4>
                <div className='orders'>{stats.totalOrders}</div>
            </div>
            <div className='cardStyle'>
                <h4>Total Products</h4>
                <div className='products'>{stats.totalProducts}</div>
            </div>
            <div className='cardStyle'>
                <h4>Total Users</h4>
                <div className='orders'>{stats.totalUsers}</div>
            </div>
            <div className='cardStyle'>
                <h4>Total Revenue</h4>
                <div className='orders'>{stats.totalRevenue}</div>
            </div>
            </div>
        ) : (
            <div className='loading'>Loading metrics...</div>
        )}

        <div className='admin-controls'>
            <h3 className='controls-title'>Administrative Controls</h3>
            <div className='controls'>
                <button className='btn' onClick={() => navigate('/admin/add-product')}>Add Product</button>
                <button className='btn' onClick={() => navigate('/admin/products')}>Manage Products</button>
                <button className='btn' onClick={() => navigate('/admin/orders')}>Manage Orders</button>
                <button className='btn' onClick={() => navigate('/admin/users')}>Users Directory</button>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard