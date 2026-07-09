const Order = require("../model/order")
const Product = require("../model/product")
const User = require("../model/user")


const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({role: 'user'})
        const totalProducts = await Product.countDocuments({})
        const totalOrders = await Order.countDocuments({})

        const orders = await Order.find({})
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue
        })
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

module.exports = {getAdminStats}