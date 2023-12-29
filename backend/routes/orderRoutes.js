const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { addOrderItems, getOrders, getOrderByID, ordersDetails, ordersEachMonthDetails, productMostSell, getOrdersByUser, editOrder, deleteOrderByID } = require('../controller/orderController');


router.get('/', protect, adminOnly, getOrders);
router.get('/user/', protect, getOrdersByUser);

router.post('/', protect, addOrderItems);
router.put('/:id', editOrder);

router.get('/details', protect, adminOnly, ordersDetails);
router.get('/month-details', protect, adminOnly, ordersEachMonthDetails);
router.get('/products-most-sold', protect, adminOnly, productMostSell);



router.get('/:id', protect, getOrderByID);
router.delete('/:id', protect, deleteOrderByID);




// router.post('/create-payment',  addPayment);
// router.post('/capture-payment',  capturePayment);


module.exports = {
    ordersRouter: router
}