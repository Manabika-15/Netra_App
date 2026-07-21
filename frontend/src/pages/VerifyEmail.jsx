import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/auth.css'

const VerifyEmail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(location.state?.message || '')
    const email = location.state?.email || ''

    const handleVerify = async (e) => {
        e.preventDefault()
        if (!email) {
            alert('No email was provided for verification.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/user/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            })
            const data = await res.json()

            if (res.ok) {
                login(data)
                setMessage('Email verified successfully!')
                navigate('/profile')
            } else {
                setMessage(data.message || 'Invalid OTP. Please try again.')
            }
        } catch (error) {
            console.error(error)
            setMessage('Unable to verify OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (!email) return

        try {
            const res = await fetch('/api/user/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            setMessage(data.message || 'A new OTP has been sent.')
        } catch (error) {
            console.error(error)
            setMessage('Unable to resend OTP. Please try again.')
        }
    }

    return (
        <div className='auth-container'>
            <form onSubmit={handleVerify} className='auth-form'>
                <h2>Verify Email</h2>
                <p>Enter the 6-digit code sent to {email || 'your email'}.</p>
                {message && <p style={{ color: '#f59e0b' }}>{message}</p>}
                <input
                    type='text'
                    placeholder='Enter OTP'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type='submit' className='btn' disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button type='button' className='btn' onClick={handleResend} style={{ marginTop: '10px' }}>
                    Resend OTP
                </button>
                <p><Link to='/login'>Back to Login</Link></p>
            </form>
        </div>
    )
}

export default VerifyEmail
