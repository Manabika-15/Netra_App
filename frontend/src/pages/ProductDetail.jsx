import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/product.css'
import { useDispatch } from 'react-redux'
import {addToCart} from '../redux/cartSlice'

const ProductDetail = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`)
                if (!res.ok) {
                    throw new Error('Product could not be loaded')
                }
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id]);

    const handleAddToCart = () => {
        if(product) {
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1
            }))
            alert("Successfully added to your cart!")
        }
    }

    if (loading) return <div style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>Loading Product...</div>;
    if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>Product Not Found</div>;

    const price = Number(product.price)
    const formattedPrice = Number.isFinite(price) ? price.toFixed(2) : 'Price unavailable'

  return (
    <div className='product-detail-wrapper'>
        <div className='product-link'>
            <Link to='/'>Home</Link> / <Link to='/shop'>Shop</Link> / {product.category} / <span>{product.name}</span>
        </div>
        <div className='product-detail'>
            <div className='product-image-container'>
                <img src={product.imageUrl} alt={product.name} className='product-image' />
            </div>
            <div className='product-info'>
                <h2>{product.name}</h2>
                <p className='product-price'>{formattedPrice === 'Price unavailable' ? formattedPrice : `₹${formattedPrice}`}</p>
                <div className='product-desc'>
                    <h4 className='desc'>Product Description</h4>
                    <p className='des'>{product.description}</p>
                </div>
                <div className='product-stocks-detail'>
                    <button onClick={handleAddToCart} className='btn'>Add to Shopping Cart</button>
                </div>
                <p style={{ marginTop: '20px', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                {product.stock > 0 ? `● In Stock (${product.stock} units available)` : `● Temporarily Out of Stock`}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail
