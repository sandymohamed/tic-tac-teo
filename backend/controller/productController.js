const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/ProductModel');


exports.getProducts = asyncHandler(async (req, res) => {

  const products = await ProductModel.find({})

  if (products) {
    return res.json(products)
  } else {
    res.status(404).json({ message: 'products not found!!' })
  }
})

exports.getnewProducts = asyncHandler(async (req, res) => {

  const products = await ProductModel.find({}).sort({ createdAt: -1 }).limit(15)

  if (products) {
    return res.json(products)
  } else {
    res.status(404).json({ message: 'products not found!!' })
  }
}
)


exports.getProductByID = asyncHandler(async (req, res) => {
  const products = await ProductModel.findById(req.params.id)

  if (products) {
    res.json(products)
  } else {
    res.status(404).json({ message: 'product not found!!' })
  }

})



exports.getProductByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  let products;

  if (!category) {
    products = await ProductModel.find({});
  } else {
    products = await ProductModel.find({ category: category });
  }

  if (products.length > 0) {
    res.json(products);
  } else {
    return res.status(500).json({ message: "This category doesn't have any products!" });
  }
});



exports.getProductByName = asyncHandler(async (req, res) => {

  const name = req.params.name;

  if (!name) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const products = await ProductModel.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } });

  if (products.length > 0) {
    res.json(products);
  } else {
    return res.status(500).json({ message: "Product not found!" });
  }
});



exports.getProductByBrand = asyncHandler(async (req, res) => {

  const brand = req.params.brand;

  if (!brand) {
    return res.status(404).json({ message: "Brand not found!" });
  }

  const products = await ProductModel.find({ brand: { $regex: '.*' + brand + '.*', $options: 'i' } });

  if (products.length > 0) {
    res.json(products);
  } else {
    return res.status(500).json({ message: "Products not found!" });
  }
});



exports.getProductByRate = asyncHandler(async (req, res) => {
  const rate = req.params.rate;

  let products = [];

  if (!rate) {
    products = await ProductModel.find({});
  } else {
    products = await ProductModel.find({
      $or: [
        {
          rating: { $eq: rate }
        },
        {
          rating: { $gt: rate }
        }
      ]
    });
  }

  if (products.length > 0) {
    res.json(products);
  } else {
    return res.status(500).json({ message: "Products not found!" });
  }
});



exports.addNewProduct = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const newProduct = new ProductModel({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    image: req.file.path,
    category: req.body.category,
    rating: req.body.rating,
    countInStock: req.body.countInStock,
  });

  try {
    const createdProduct = await newProduct.save();

    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Product creation failed' });
  }
});


exports.editProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const {
    name,
    brand,
    price,
    description,
    category,
    rating,
    countInStock
  } = req.body;

  const product = await ProductModel.findById(id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  // Create a new product instance with the uploaded image path
  product.name = name ||  product.name;
  product.brand = brand || product.brand;
  product.price = price || product.price;
  product.description = description || product.description ;
  product.image = req?.file?.path || product.image;
  product.category = category || product.category;
  product.rating = rating|| product.rating;
  product.countInStock = countInStock || product.countInStock;

  console.log('pr', product);
  try {
    // Save the new product to the database
    const updatedProduct = await product.save();

    // Return the created product as the API response
    res.json(updatedProduct);
  } catch (error) {
    // Handle any errors that occurred during saving
    res.status(500).json({ message: 'Product update failed!!', error });
  }
});





exports.deleteProductByID = asyncHandler(async (req, res) => {

  const products = await ProductModel.findByIdAndDelete(req.params.id)

  if (!products) {
    res.status(404).json({ message: 'product not found!!' })
  } else {
    res.json({ message: `product ${req.params.id} deleted successfully` })
  }

})



//  get all categories' names
exports.getCategoriesNames = asyncHandler(async (req, res) => {
  
  try {
    const categories = await ProductModel.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
});


//  get all brand's names
exports.getBrandsNames = asyncHandler(async (req, res) => {
  try {
    const brands = await ProductModel.distinct('brand');
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve brands' });
  }
});

