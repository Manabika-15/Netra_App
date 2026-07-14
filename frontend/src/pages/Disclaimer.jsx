import React from 'react'
import '../styles/infoPages.css'

const Disclaimer = () => {
  return (
    <section className="info-page info-page--reading">
      <div className="info-page__hero">
        <p className="info-page__eyebrow">Disclaimer</p>
        <h1>Clear information for a better experience.</h1>
        <p>This page explains the general terms for using Netra and the information shown on the platform.</p>
      </div>

      <div className="info-page__content">
        <article>
          <h2>General information</h2>
          <p>Product descriptions, prices, availability, and images are provided for general shopping information. We work to keep them accurate, but occasional updates or errors may occur.</p>
        </article>
        <article>
          <h2>Product representation</h2>
          <p>Colours and visual details can appear differently depending on your screen or device. Please review each product description carefully before placing an order.</p>
        </article>
        <article>
          <h2>Third-party services</h2>
          <p>Netra may rely on external payment, delivery, and technology providers. Their services are governed by their own terms and privacy practices.</p>
        </article>
        <article>
          <h2>Policy updates</h2>
          <p>We may update this disclaimer as the platform evolves. Continued use of Netra means you accept the most current version displayed here.</p>
        </article>
      </div>
    </section>
  )
}

export default Disclaimer
