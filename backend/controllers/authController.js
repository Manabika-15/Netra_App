const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")

const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})

const createVerificationOtp = () => crypto.randomInt(100000, 1000000).toString()
const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex')

const sendVerificationOtp = async (user) => {
    const otp = createVerificationOtp()
    user.verificationOtpHash = hashOtp(otp)
    user.verificationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await user.save()

    const message = `Welcome to Netra, ${user.name}!\n\nYour verification OTP is: ${otp}\n\nIt expires in 10 minutes. Do not share this code with anyone.`
    return sendEmail(user.email, 'Netra email verification OTP', message)
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    const normalizedEmail = email?.trim().toLowerCase()

    try {
        const existingUser = await User.findOne({email: normalizedEmail}).select('+verificationOtpHash +verificationOtpExpiresAt')
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists!'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // const user = await User.create({name, email: normalizedEmail, password: hashedPassword})
        // const sent = await sendVerificationOtp(user)

        // res.status(sent ? 201 : 503).json({
        //     message: sent ? 'Account created. Check your email for the verification OTP.' : 'Account created, but the verification OTP could not be sent. Please request a new one.',
        //     email: user.email,
        //     verificationRequired: true,
        // })
        const user = await User.create({
            name, email: normalizedEmail,  password: hashedPassword, verified: true,
        })
        res.status(201).json({
            _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id),
        })
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({message: "Server error!"})
    }
}

const verifyEmailOtp = async (req, res) => {
    const {email, otp} = req.body
    const normalizedEmail = email?.trim().toLowerCase()

    try {
        const user = await User.findOne({email: normalizedEmail}).select('+verificationOtpHash +verificationOtpExpiresAt')
        if (!user || user.verified || !user.verificationOtpHash || !user.verificationOtpExpiresAt) {
            return res.status(400).json({message: 'Invalid or expired verification request.'})
        }

        const isExpired = user.verificationOtpExpiresAt < new Date()
        const isValidOtp = hashOtp(String(otp)) === user.verificationOtpHash
        if (isExpired || !isValidOtp) {
            return res.status(400).json({message: 'Invalid or expired OTP.'})
        }

        user.verified = true
        user.verificationOtpHash = undefined
        user.verificationOtpExpiresAt = undefined
        await user.save()

        res.json({
            message: 'Email verified successfully.',
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } catch (error) {
        console.error('Email verification error:', error)
        res.status(500).json({message: 'Unable to verify email.'})
    }
}

const resendVerificationOtp = async (req, res) => {
    const normalizedEmail = req.body.email?.trim().toLowerCase()

    try {
        const user = await User.findOne({email: normalizedEmail}).select('+verificationOtpHash +verificationOtpExpiresAt')
        if (!user) {
            return res.status(404).json({message: 'No account found for this email.'})
        }
        if (user.verified) {
            return res.status(400).json({message: 'This email has already been verified.'})
        }

        const sent = await sendVerificationOtp(user)
        res.status(sent ? 200 : 503).json({message: sent ? 'A new verification OTP has been sent.' : 'Unable to send a verification OTP. Please try again.'})
    } catch (error) {
        console.error('OTP resend error:', error)
        res.status(500).json({message: 'Unable to resend the verification OTP.'})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email?.trim().toLowerCase()})
        if(user && (await bcrypt.compare(password, user.password))){
            
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({message: "Invalid email or password"})
        }
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -verificationOtpHash -verificationOtpExpiresAt')
        res.json(users)
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

module.exports = {
    registerUser,
    loginUser,
    verifyEmailOtp,
    resendVerificationOtp,
    getUsers,
}
