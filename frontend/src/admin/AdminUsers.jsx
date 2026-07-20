import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/adminusers.css'

const AdminUsers = () => {
    const {user} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/user/users', {
                headers: {Authorization: `Bearer ${user.token}`}
            })
            const data = await res.json()
            setUsers(Array.isArray(data) ? data : [])
        }
        fetchUsers()
    }, [user])

  return (
    <div className='admin-user-container'>
        <h2 className='container'>User Directory</h2>
        <div className='contain'>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-header'>ID</th>
                        <th className='table-header'>NAME</th>
                        <th className='table-header'>EMAIL</th>
                        <th className='table-header'>ROLE</th>
                        <th className='table-header'>JOINED</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} className='table-row'>
                            <td className='table-data'>{u._id.substring(0, 8)}...</td>
                            <td className='table-data'>{u.name}</td>
                            <td className='table-data'>{u.email}</td>
                            <td className='table-data'>
                                <span style={{ background: u.role === 'admin' ? 'rgba(234,88,12,0.2)' : 'rgba(16,185,129,0.2)', color: u.role === 'admin' ? '#f97316' : '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    {u.role.toUpperCase()}
                                </span>
                            </td>
                            <td className='table-data'>{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminUsers