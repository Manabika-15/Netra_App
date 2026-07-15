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
import ProductDetail from './pages/ProductDetail'

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
            <Route path="/products/:id" element={<ProductDetail/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
