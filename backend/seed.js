const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const connectDB = require("./config/db")
const User = require("./model/user")
const Product = require("./model/product")
const Order = require("./model/order")

dotenv.config({path: path.join(__dirname, ".env")})

const users = [
    {
        name: "Admin User",
        email: "admin@netra.com",
        password: "admin123",
        role: "admin",
        verified: true
    },
    {
        name: "Manab Customer",
        email: "manab@netra.com",
        password: "user123",
        role: "user",
        verified: true
    },
    {
        name: "Demo Customer",
        email: "demo@netra.com",
        password: "user123",
        role: "user",
        verified: true
    }
]

const products = [
    {
        name: "Classic Aviator Sunglasses",
        description: "Lightweight metal-frame sunglasses with UV protection and a timeless aviator shape.",
        price: 1499,
        category: "Sunglasses",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
        rating: 4.6,
        numReviews: 18
    },
    {
        name: "Blue Light Computer Glasses",
        description: "Comfortable daily-use glasses designed for long screen sessions.",
        price: 899,
        category: "Computer Glasses",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371",
        rating: 4.4,
        numReviews: 31
    },
    {
        name: "Round Transparent Eyeglasses",
        description: "Clear round frame eyeglasses with a modern minimal style.",
        price: 1199,
        category: "Eyeglasses",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        rating: 4.8,
        numReviews: 24
    },
    {
        name: "Premium Contact Lens Pack",
        description: "Monthly soft contact lenses for clear vision and all-day comfort.",
        price: 699,
        category: "Contact Lenses",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8",
        rating: 4.2,
        numReviews: 12
    }
]

const addresses = [
    {
        fullName: "Manab Customer",
        street: "12 Park Street",
        city: "Kolkata",
        postalCode: "700016",
        country: "India"
    },
    {
        fullName: "Demo Customer",
        street: "44 MG Road",
        city: "Bengaluru",
        postalCode: "560001",
        country: "India"
    }
]

const hashUsers = async () => {
    const salt = await bcrypt.genSalt(10)

    return Promise.all(
        users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, salt)
        }))
    )
}

const clearCollections = async () => {
    await Order.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})
}

const importData = async () => {
    try {
        await connectDB()
        await clearCollections()

        const createdUsers = await User.insertMany(await hashUsers())
        const createdProducts = await Product.insertMany(products)

        const manabUser = createdUsers.find((user) => user.email === "manab@netra.com")
        const demoUser = createdUsers.find((user) => user.email === "demo@netra.com")

        const orders = [
            {
                user: manabUser._id,
                items: [
                    {
                        productId: createdProducts[0]._id,
                        quantity: 1,
                        price: createdProducts[0].price
                    },
                    {
                        productId: createdProducts[1]._id,
                        quantity: 2,
                        price: createdProducts[1].price
                    }
                ],
                totalAmount: createdProducts[0].price + createdProducts[1].price * 2,
                address: addresses[0],
                paymentId: "pay_seed_manab_001",
                status: "delivered"
            },
            {
                user: demoUser._id,
                items: [
                    {
                        productId: createdProducts[2]._id,
                        quantity: 1,
                        price: createdProducts[2].price
                    }
                ],
                totalAmount: createdProducts[2].price,
                address: addresses[1],
                paymentId: "pay_seed_demo_001",
                status: "shipped"
            },
            {
                user: manabUser._id,
                items: [
                    {
                        productId: createdProducts[3]._id,
                        quantity: 3,
                        price: createdProducts[3].price
                    }
                ],
                totalAmount: createdProducts[3].price * 3,
                address: addresses[0],
                paymentId: "pay_seed_manab_002",
                status: "pending"
            }
        ]

        await Order.insertMany(orders)

        console.log("Seed data imported successfully!")
        console.log("Admin login: admin@netra.com / admin123")
        console.log("User login: manab@netra.com / user123")
        console.log("Demo login: demo@netra.com / user123")
        process.exit(0)
    } catch (error) {
        console.error(`Seed import failed: ${error.message}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await connectDB()
        await clearCollections()

        console.log("Seed data destroyed successfully!")
        process.exit(0)
    } catch (error) {
        console.error(`Seed destroy failed: ${error.message}`)
        process.exit(1)
    }
}

if (process.argv.includes("--destroy")) {
    destroyData()
} else {
    importData()
}
