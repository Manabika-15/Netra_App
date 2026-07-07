const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message: "User already exists"})
        }
        
        const salt = await bcrypt.genSalt(10) // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = User.create({name, email, password: hashedPassword})
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString()

            const message = `
            Welcome to Netra: the ultimate place for shopaholics, ${name}!
            Your OTP for Netra registration: ${otp}
            
            Thank you for the registration!
            We are excited to provide you the best products in the best price!`

            await sendEmail(email, 'Welcome to Netra - Your OTP for Registration', message)

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({message: "Invalid User details!"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
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
        const users = await User.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
}