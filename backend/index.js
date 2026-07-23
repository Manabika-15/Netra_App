const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
const connectDB = require("./config/db")
const userRoute = require("./routes/authRoutes")
const productRoute = require("./routes/productRoutes")
const orderRoute = require("./routes/orderRoutes")
const paymentRoute = require("./routes/paymentRoutes")
const analyticsRoute = require("./routes/analyticsRoutes")

// Load environment variables from backend/.env to avoid cwd issues
dotenv.config({ path: path.join(__dirname, '.env') })
connectDB()

const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/" ,(req, res) => {
    res.send("Netra working!")
})

app.use('/api/user', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/analytics', analyticsRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Netra API is running in Development Mode...")
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`)
})