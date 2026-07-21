import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/editProducts.css'

const EditProducts = () => {
    const { id } = useParams()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const[formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', stock: ''
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${id}`)
            const data = await res.json()
            setFormData({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock
            })
        }
        fetchProduct()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('price', formData.price)
        data.append('category', formData.category)
        data.append('stock', formData.stock)
        if(image) data.append('image', image)

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {Authorization: `Bearer ${user.token}`},
                body: data
            })
            const responseData = await res.json().catch(() => ({}))

            if (res.ok) {
                alert('Product updated successfully!')
                navigate('/admin/products')
            } else {
                alert(responseData.message || 'Unable to update the product.')
            }
        } catch (error) {
            console.error('Error updating product:', error)
            alert('Unable to update the product. Please try again.')
        } finally {
            setLoading(false)
        }
    }


  return (
    <div className='form-edit-product'>
        <h2 className='edit-product-heading'>Edit Product</h2>
        <form onSubmit={handleSubmit} className='form-edit-product'>
            <input type="text" placeholder='Product Name' required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className='input'/>
            <textarea placeholder='Description' required rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className='input'/>
            <input type="number" placeholder='Price' required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className='input'/>
            <input type="text" placeholder='Category' required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className='input'/>
            <input type="number" placeholder='Stock' required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className='input'/>
            <div className='replacing-image-container'>
                <label className='replace-image'>Replace Image (Optional)</label>
                <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} className='image-set' />
            </div>
            <button type='submit' disabled={loading} className='submit-btn' >
                {loading ? 'Updating...' : 'Update Product'}
            </button>
        </form>
    </div>
  )
}

export default EditProducts
