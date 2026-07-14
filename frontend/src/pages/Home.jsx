import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';


const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const data = await res.json()
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className='home-container mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <section className='hero-banner rounded-2xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 px-6 py-16 text-center shadow-2xl sm:px-10'>
                <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl'>Welcome to Netra</h1>
                <p className='mx-auto mt-4 max-w-2xl text-lg text-slate-300'>The ultimate shopping site for absolute shopaholics</p>
            </section>
            <h2 className='mt-12 text-3xl font-bold tracking-tight text-white'>Featured Products</h2>
            {loading ? (
                <div className='py-10 text-slate-400'>Loading products...</div>
            ) : (
                <div className='product-grid mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;
