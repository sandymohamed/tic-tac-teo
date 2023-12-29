const mongoose = require('mongoose')
const dotenv = require('dotenv')

const users = require('./data/users')
const products = require('./data/products')

const User = require('./models/UserModel')
const ProductModel = require('./models/ProductModel')
const Order = require('./models/OrderModel')
const connectDB = require('./config/db')

// ----------------------------------------------------------------------

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await ProductModel.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users)

        const adminUser = createdUser[0]._id

        const sampleProducts = products.map((product) => (
            {...product, user:adminUser}
        ))

        await ProductModel.insertMany(sampleProducts)

        process.exit()
    }
    catch (error) {
        console.error(error)
        process.exit()
    }
}


const destroyData = async() => {
    try{
        await Order.deleteMany();
        await ProductModel.deleteMany();
        await User.deleteMany();

        process.exit()

    }
    catch (error) {
        console.error(error)
        process.exit()
    }
}


if (process.argv[2] === '-d'){
    destroyData()
}else{
    importData();
}
