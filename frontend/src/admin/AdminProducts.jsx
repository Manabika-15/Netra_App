import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {Link} from 'react-router-dom'
import '../styles/adminProducts.css'

const AdminProducts = () => {
    const {user} = useContext(AuthContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products')
            const data = await res.json()
            setProducts(Array.isArray(data) ? data : [])
        }
        fetchProducts()
    }, [])
    
    const handleDeleteProduct = async (id) => {
        if(window.confirm('Are you strictly sure you want to delete this?')) {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${user.token}`}
            })
            if(res.ok) {
                setProducts(products.filter(p => p._id !== id))
            }
        }
    }

  return (
    <div className='admin-products-container'>
        <div className='container'>
            <h2 className='manage-heading'>Manage Products</h2>
            <Link to="/admin/add-product" className='btn'>+ Add Product</Link>
        </div>

        <div className='table-product'>
            <table className='table-style'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-heading'>ID</th>
                        <th className='table-heading'>NAME</th>
                        <th className='table-heading'>PRICE</th>
                        <th className='table-heading'>CATEGORY</th>
                        <th className='table-heading'>STOCK</th>
                        <th className='table-heading'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr className='table-row' key={product._id}>
                            <td className='table-data'>{product._id.substring(0, 8)}...</td>
                            <td className='table-data'>{product.name}</td>
                            <td className='table-data'>{product.price.toFixed(2)}</td>
                            <td className='table-data'>{product.category}</td>
                            <td className='table-data'>{product.stock}</td>
                            <td className='table-data'>
                                <Link to={`/admin/edit-product/${product._id}`} className='edit-product-btn'>Edit</Link>
                                <button className='delete-btn' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminProducts
