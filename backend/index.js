const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoute = require("./routes/authRoutes")
const productRoute = require("./routes/productRoutes")
const orderRoute = require("./routes/orderRoutes")
const paymentRoute = require("./routes/paymentRoutes")
const analyticsRoute = require("./routes/analyticsRoutes")

dotenv.config()
connectDB()

const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`)
})