import React from 'react'
import '../styles/infoPages.css'

const About = () => {
    return (
        <section className="info-page">
            <div className="info-page__hero">
                <p className="info-page__eyebrow">About Netra</p>
                <h1>Shopping made clear, simple, and dependable.</h1>
                <p>Netra is a modern e-commerce experience built to help customers discover quality everyday products with confidence.</p>
            </div>

            <div className="info-page__grid">
                <article className="info-card">
                    <h2>Our purpose</h2>
                    <p>We focus on a clean browsing experience, transparent product information, and a checkout journey that feels effortless from start to finish.</p>
                </article>
                <article className="info-card">
                    <h2>What we value</h2>
                    <p>Clarity, thoughtful design, and customer-first service guide every part of Netra—from the products we feature to the information we share.</p>
                </article>
                <article className="info-card">
                    <h2>Built for everyday choices</h2>
                    <p>Whether you are looking for a practical essential or something new to explore, Netra keeps the experience focused, reliable, and easy to use.</p>
                </article>
            </div>

            <article className="info-page__founder">
                <p className="info-page__eyebrow">The person behind Netra</p>
                <h2>Built by Manabika Das</h2>
                <p>Netra is designed and developed by Manabika with a focus on creating a professional, intuitive online shopping platform.</p>
            </article>
        </section>
    )
}

export default About
