import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Disclaimer from './pages/Disclaimer'
import ReturnPolicy from './pages/ReturnPolicy'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import AdminOrders from './admin/AdminOrders'
import AdminProducts from './admin/AdminProducts'
import AdminUsers from './admin/AdminUsers'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProducts'

function App() {
  return(
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/disclaimer" element={<Disclaimer/>} />
            <Route path="/return" element={<ReturnPolicy/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/verify-email" element={<VerifyEmail/>} />
            <Route path="/products/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/ordersuccess' element={<OrderSuccess/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='/admin/add-product' element={<AddProduct/>} />
            <Route path='/admin/products' element={<AdminProducts/>} />
            <Route path='/admin/edit-product/:id' element={<EditProduct/>} />
            <Route path='/admin/orders' element={<AdminOrders/>} />
            <Route path='/admin/users' element={<AdminUsers/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
