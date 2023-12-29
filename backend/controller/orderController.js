const asyncHandler = require('express-async-handler')
const OrderModel = require('../models/OrderModel');
const UserModel = require('../models/UserModel');
const ProductModel = require('../models/ProductModel');

// const paypal = require('paypal-rest-sdk');
// const { CheckoutNodeJssdk } = require('@paypal/checkout-server-sdk');


exports.getOrders = asyncHandler(async (req, res) => {

  const orders = await OrderModel.find({})

  if (orders) {
    return res.json(orders)
  } else {
    res.status(404).json({ message: 'order not found!!' })
  }
}
)


exports.getOrderByID = asyncHandler(async (req, res, next) => {
  const orders = await OrderModel.findById(req.params.id)

  if (orders) {
    res.json(orders)
  } else {
    res.status(404).json({ message: 'order not found!!' })
  }

})


exports.getOrdersByUser = asyncHandler(async (req, res) => {


  const orders = await OrderModel.find({ user: req.user }).sort({ createdAt: -1 });

  if (orders) {
    res.json(orders)
  } else {
    res.status(404).json({ message: 'order not found!!' })
  }

})

exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    products,
    totalPrice,
    shippingAddress,
    paymentMethods,
    taxPrice,
    shippingPrice,
    isPaid,
    paidAt,
    // status,
    deliveredAt,
  } = req.body;

  if (!products || products.length === 0) {
    res.status(400).json({ message: 'No order items' });
  } else {
    const order = new OrderModel({
      user: req.user._id,
      products,
      totalPrice,
      shippingAddress,
      paymentMethods,
      // paymentResult,
      taxPrice,
      shippingPrice,
      isPaid,
      paidAt,
      // status,
      deliveredAt,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});


exports.editOrder = asyncHandler(async (req, res) => {

  const {
    paymentResult,
    status,
    deliveredAt,
  } = req.body;

  const order = await OrderModel.findById(req.params.id)

  if (!order) {
    res.status(404).json({ message: 'order not found!!' })
  } 

  if (status && status !== 'placed' && status !== 'shipped' && status !== 'delivered') {
    res.status(500).json({ message: 'delieverdAt should be one of three options {placed / shipped / delivered}' });
  }
  
    order.paymentResult = paymentResult;
    order.status = status;
    order.delieverdAt = deliveredAt;
  try{

   const updatedOrder= await order.save();
    res.status(200).json(order);
  } catch(error) {
    res.status(500).json({ message: 'Order update failed!!' });

  }
})


exports.deleteOrderByID = asyncHandler(async (req, res) => {

  const order = await OrderModel.findByIdAndDelete(req.params.id)

  if (!order) {
    res.status(404).json({ message: 'order not found!!' })
  } else {
    res.json({ message: `order ${req.params.id} deleted successfully` })
  }

})




// Route to get order and user data for infographics
exports.ordersDetails = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate('user', 'name email');
    const users = await UserModel.find({});

    const orderCount = orders.length;
    const userCount = users.length;


    res.json({
      orderCount,
      userCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve infographics data' });
  }
});


// Route to get order and user data for infographics
exports.ordersEachMonthDetails = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('user', 'name email');
    const users = await UserModel.find();

    // Prepare the monthly data for infographics
    const monthlyData = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Loop through each month
    for (let month = 1; month <= currentMonth; month++) {
      const monthOrders = orders.filter(order => {
        const orderMonth = order.createdAt.getMonth() + 1;
        const orderYear = order.createdAt.getFullYear();
        return orderMonth === month && orderYear === currentYear;
      });

      const monthUsers = users.filter(user => {
        const userMonth = user.createdAt.getMonth() + 1;
        const userYear = user.createdAt.getFullYear();
        return userMonth === month && userYear === currentYear;
      });

      // Calculate the required data for each month
      const orderCount = monthOrders.length;
      const userCount = monthUsers.length;

      // Other calculations and data preparations as needed

      // Store the monthly data
      monthlyData.push({
        month,
        year: currentYear,
        orderCount,
        userCount,
        // Other data for the month
      });
    }

    // Send the monthly data as the API response
    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve infographics data' });
  }
});



// Route to get order and user data for infographics
exports.productMostSell = asyncHandler(async (req, res) => {
  try {
    // Retrieve all orders
    const orders = await OrderModel.find({});
    
    // Count the quantity of each product sold
    const productQuantityMap = {};
    
    
    orders.forEach(order => {
      order.products.forEach(product => {

        const productId = product._id.toString();
        const quantity = product.quantity;


        if (productQuantityMap.hasOwnProperty(productId)) {
          productQuantityMap[productId] += quantity;
        } else {
          productQuantityMap[productId] = quantity;
        }
      });
    });


    // Sort the products by quantity in descending order
    const sortedProducts = Object.entries(productQuantityMap).sort((a, b) => b[1] - a[1]);

    // Retrieve the product details for the most sold products
    const mostSoldProducts = [];


    for (let i = 0; i < Math.min(5, sortedProducts.length); i++) {
      const productId = sortedProducts[i][0];
      const quantity = sortedProducts[i][1];

      const product = await ProductModel.findById(productId);

      if (product) {
        mostSoldProducts.push({
          product,
          quantity
        });
      }
    }

    res.json(mostSoldProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve most sold products' });
  }
});








// exports.addPayment = asyncHandler(async (req, res) => {
//   const { total, currency, description, returnUrl, cancelUrl } = req.body;
//   console.log('create', total, currency, description, returnUrl, cancelUrl);
//   try {

//     const paymentData = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: returnUrl,
//         cancel_url: cancelUrl,
//       },
//       transactions: [
//         {
//           amount: {
//             total,
//             currency,
//           },
//           description,
//         },
//       ],
//     };

//     if (paymentData) {
//       // const { links } = paymentData;
//       // const approvalUrl = links.find(link => link.rel === 'approval_url');
//       // res.redirect(returnUrl);
//       res.json({ status: 'success', paymentData });
//     }
//     else {
//       res.sendStatus(500);
//     }
//   } catch (err) {
//     console.log('Error in create payment:', err);
//     res.status(400).json({ message: 'Invalid data!' });
//   }

// });


// exports.capturePayment = asyncHandler(async (req, res) => {
//   console.log('capture');

//   const { paymentId, payerId, total, currency } = req.body;
//   try {

//     const captureData = {
//       amount: {
//         currency,
//         total,
//       },
//     };

//     if (captureData) {
//       res.json({ status: 'success', captureData, paymentId, payerId });
//     }
//     else {
//       res.json({ status: 'failed', captureData });
//     }
//   } catch (err) {
//     console.log('Error in create payment:', err);
//     res.status(400).json({ message: 'Invalid data!' });
//   }

// });
