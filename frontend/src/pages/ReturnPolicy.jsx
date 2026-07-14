import React from 'react'
import '../styles/infoPages.css'

const ReturnPolicy = () => {
  return (
    <section className="info-page info-page--reading">
      <div className="info-page__hero">
        <p className="info-page__eyebrow">Return policy</p>
        <h1>Returns should be straightforward.</h1>
        <p>Our demo policy outlines a clear process for return requests and product eligibility.</p>
      </div>

      <div className="info-page__content">
        <article>
          <h2>14-day return window</h2>
          <p>Return requests may be submitted within 14 days of delivery. Keep your order details available so we can review the request promptly.</p>
        </article>
        <article>
          <h2>Eligibility</h2>
          <p>Items should be unused, in their original condition, and returned with all supplied packaging, labels, and accessories. Products damaged after delivery may not qualify.</p>
        </article>
        <article>
          <h2>How to request a return</h2>
          <p>Contact our support team with your order number and the reason for your request. Once approved, you will receive the next steps for returning the item.</p>
        </article>
        <article>
          <h2>Refunds</h2>
          <p>After the returned item is received and inspected, eligible refunds are issued to the original payment method. Processing time may vary by payment provider.</p>
        </article>
      </div>
    </section>
  )
}

export default ReturnPolicy
