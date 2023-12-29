const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('./multerConfig');
const { getReviews, addNewReview, getReviewByID, editReview, deleteReviewByID, deleteReviewByIDAdmin } = require('../controller/ReviewsController');


router.post('/', getReviews)
router.post('/new',upload.single('image'), protect, addNewReview)

router.put('/edit/:id',upload.single('image'), protect, editReview)


router.get('/:id', getReviewByID)

router.delete('/admin/:id', protect, adminOnly, deleteReviewByIDAdmin);
router.delete('/:id', protect, deleteReviewByID);




module.exports = {
  reviewRouter: router
}