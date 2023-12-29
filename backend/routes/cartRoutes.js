const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCartItems, getCartByID, addCartItems, deleteCart, getCartByUser } = require('../controller/cartController');

router.get('/user/', protect, getCartByUser);
router.get('/', protect, getCartItems);

router.post('/',protect, addCartItems);
router.get('/:id', protect, getCartByID);

router.delete('/',protect, deleteCart);



module.exports = {
    cartRouter: router
}