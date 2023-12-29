const asyncHandler = require('express-async-handler')
const CartModel = require('../models/CartModel');


exports.getCartItems = asyncHandler(async (req, res) => {

  const cart = await CartModel.find({}).populate("products")

  if (cart) {
    return res.json(cart)
  } else {
    res.status(404).json({ message: 'Not found!!' })
  }
}
)


exports.getCartByID = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findById(req.params.id)

  if (cart) {
    res.json(cart)
  } else {
    res.status(404).json({ message: 'Cart not found!!' })
  }

})

exports.getCartByUser = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const cart = await CartModel.find({ user });

  if (cart) {
    res.json(cart)
  } else {
    res.status(404).json({ message: 'Cart not found!!' })
  }

})


exports.addCartItems = asyncHandler(async (req, res) => {
  const {
    // user,
    products,
    total,
    totalQuantity,
  } = req.body;

  const user = req.user._id;

  if (!user) {
    return res.status(200).json({ message: "there is no user so data didn't save " });
  } else {

    // Find the cart for the user
    const cart = await CartModel.findOne({ user: user });

    if (!products || products.length === 0) {
      res.status(400).json({ message: 'No cart items' });

    } else {
      if (cart) {
        // If cart exists, update it with new products
        cart.products = products;
        cart.total = total;
        cart.totalQuantity = totalQuantity;
        await cart.save();
        res.status(200).json(cart);

      } else {

        // If cart doesn't exist, create a new one
        const newCart = new CartModel({
          user,
          products,
          total,
          totalQuantity,
        });

        const createdCart = await newCart.save();
        res.status(200).json(createdCart);
      }
    }
  }

});




// delete one cart by id
exports.deleteCart = asyncHandler(async (req, res) => {
  const user = req.user._id;

  try {
    // Delete the cart
    const result = await CartModel.deleteOne({ user });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
