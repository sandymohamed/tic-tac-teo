const asyncHandler = require('express-async-handler')
const ReviewsModel = require('../models/ReviewsModel')


exports.getReviews = asyncHandler(async (req, res) => {

  const productId = req.body.product;

  if (productId) {
    const reviews = await ReviewsModel.find({ productId }).populate('userId').sort({rating: -1})
    if (!reviews) {

      res.status(200).json({ message: 'There is no reviews yet!!' })
    }
    return res.json(reviews)

  } else {
    res.status(404).json({ message: 'Product not found!' })
  }
}
)


exports.getReviewByID = asyncHandler(async (req, res) => {
  const review = await ReviewsModel.findById(req.params.id)

  if (review) {
    res.json(review)
  } else {
    res.status(404).json({ message: 'review not found!!' })
  }

})



exports.addNewReview = asyncHandler(async (req, res) => {
  const user = req.user._id;

  if (!req.body.product && !user) {
    return res.status(400).json({ message: 'No user or product selected' });
  }

  const newReview = new ReviewsModel({
    productId: req.body.product,
    userId: user,
    rating: req.body.rating,
    comment: req.body.comment,
    image: req?.file?.path,


  });

  try {
    const createdReview = await newReview.save();
    
    res.json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review' });
  }
});


exports.editReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user._id;

  const review = await ReviewsModel.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  review.rating = req.body.rating;
  review.comment = req.body.comment;
  review.image = req.file.path;

  try {
    if (review.userId.equals(user)) {
      const updatedReview = await review.save(); // Fixed typo here
      res.json(updatedReview);
    } else {
      res.status(403).json({ message: 'Unauthorized!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Review update failed!' });
  }
});





exports.deleteReviewByID = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const review = await ReviewsModel.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found!' });
  }

  if (user.equals(review.userId)) {
    await ReviewsModel.findByIdAndDelete(review._id);
    res.json({ message: `Review ${req.params.id} deleted successfully` });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

exports.deleteReviewByIDAdmin = asyncHandler(async (req, res) => {

  try{
  const review = await ReviewsModel.findByIdAndDelete(req.params.id);

  res.json(review);
} catch (error) {
  res.status(500).json({ message: 'Failed to delete' });
}
});


