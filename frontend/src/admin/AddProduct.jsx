import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/addproduct.css'

const AddProduct = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', stock: ''
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    if(!user || user.role !== 'admin'){
        navigate('/')
        return null;
    }

    const handleSubmit = async (e) => {
        e.prevenDefault()
        if(!image) return alert('Please select an image')
        
        setLoading(true)
        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('price', formData.price)
        data.append('category', formData.category)
        data.append('stock', formData.stock)
        data.append('image', image)

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {Authorization: `Bearer ${user.token}`},
                body: data
            })
            const data = await res.json()

            if(res.ok){
                alert("Product created successfully with Cloudinary Image URL!")
                navigate('/shop')
            } else {
                alert(data.message || "Error creating product")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='addproduct-container'>
        <h2 className='container'>Add New Product</h2>
        <form onSubmit={handleSubmit} className='form-style'>
            <input type="text" placeholder='Product Name' required
            onChange={(e) => setFormData({...formData, name: e.target.value})} className='form'/>
            <textarea 
          placeholder="Description" required rows="4"
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className='form'
        />
        <input 
          type="number" placeholder="Price" required 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          className='form'
        />
        <input 
          type="text" placeholder="Category" required 
          onChange={(e) => setFormData({...formData, category: e.target.value})} 
          className='form'
        />
        <input 
          type="number" placeholder="Stock Quantity" required 
          onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          className='form'
        />

        <div className='product-image'>
            <label className='upload-image'>Upload Product Image(Cloudinary)</label>
            <input type="file" accept='image/*' required onChange={(e) => setImage(e.target.files[0])} className='image'/>
        </div>

        <button type='submit' disabled={loading} className='btn'>
            {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>

        </form>
    </div>
  )
}

export default AddProduct