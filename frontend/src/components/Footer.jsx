import React from "react";
import {Link} from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-brand">Netra</p>
                 <ul className="footer-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/return">Return Policy</Link></li>
                    <li><Link to="/disclaimer">Disclaimer</Link></li>
                 </ul>
                <p className="footer-para">&copy; {new Date().getFullYear()} Netra. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
