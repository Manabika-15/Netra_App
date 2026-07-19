const razorpayInstance = require("../config/razorpay")
const crypto = require("crypto")

const createdOrder = async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }
        const order = await razorpayInstance.orders.create(options)
        res.status(200).json({ ...order, key: process.env.RAZORPAY_KEY_ID })
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex")
        if(generated_signature === razorpay_signature){
            res.status(200).json({message: "Payment verified successfully!"})
        } else {
            res.status(400).json({message: "Payment verification failed!"})
        }
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

module.exports = {
    createdOrder,
    verifyPayment
}
