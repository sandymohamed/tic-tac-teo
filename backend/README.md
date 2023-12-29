Sure! Here's the updated README file written in Markdown format:

# Backend E-Commerce Website - README

This is the README file for the backend of an E-Commerce website. The backend is responsible for managing various functionalities related to users, products, carts, orders, and product reviews. It is built using Node.js with Express.js as the framework and MongoDB as the database with Mongoose.js for object modeling.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- Node.js (v12 or higher)
- MongoDB (v4 or higher)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/sandymohamed/backend-Node-Ecommerce.git
cd backend-Node-Ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment Variables:

Copy the `.env.example` file to `.env` and update the values as required. Make sure to set the MongoDB connection string and any other necessary environment variables.

4. Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:3000`.

## API Endpoints

Here are the available API endpoints for the backend:

1. **Users**

- `POST /api/users/`: Get All users data (requires admin access).
- `POST /api/users/signup`: Register a new user.
- `POST /api/users/login`: Login with existing user credentials.
- `GET /api/users/profile`: Get the current user's profile (requires authentication).
- `PUT /api/users/profile`: Update the current user's profile (requires authentication).
- `GET /api/users/:id`: Get user's profile by user id (requires authentication).
- `DELETE /api/users/`: Delete the current user's profile (requires authentication).

2. **Products**

- `GET /api/products`: Get a list of all products.
- `GET /api/products/latest`: Get a list of the latest products.
- `GET /api/products/category/:category`: Get products belonging to a specific category.
- `GET /api/products/name/:name`: Get products with a specific name.
- `GET /api/products/brand/:brand`: Get products from a specific brand.
- `GET /api/products/rate/:rate`: Get products with a specific rating.
- `GET /api/products/all-brands`: Get a list of all distinct brand names.
- `GET /api/products/all-categories`: Get a list of all distinct category names.
- `GET /api/products/:id`: Get a specific product by its ID.
- `POST /api/products`: Create a new product (requires authentication and admin access).
- `PUT /api/products/:id`: Update an existing product (requires authentication and admin access).
- `DELETE /api/products/:id`: Delete a product (requires authentication and admin access).

3. **Cart**

- `GET /api/carts/user`: Get the current user's cart (requires authentication).
- `POST /api/carts`: Add a product to the cart Or :  Update the quantity of a product in the cart (requires authentication).
- `DELETE /api/carts/`: Remove a product from the cart of the current user (requires authentication).

4. **Orders**

- `GET /api/orders`: Get a list of all orders (requires authentication as an admin).
- `GET /api/orders/user`: Get a list of orders for the current authenticated user (requires authentication).
- `POST /api/orders`: Create a new order (requires authentication).
- `PUT /api/orders/:id`: Update an existing order (requires authentication).
- `GET /api/orders/details`: Get order and user data for infographics (requires authentication as an admin).
- `GET /api/orders/month-details`: Get order and user data for each month (requires authentication as an admin).
- `GET /api/orders/products-most-sold`: Get the most sold products (requires authentication as an admin).
- `GET /api/orders/:id`: Get a specific order by its ID (requires authentication).
- `DELETE /api/orders/:id`: Delete an order by its ID (requires authentication).

5. **Product Reviews**

- `POST /api/reviews/`: Get all reviews for a specific product.
- `GET /api/reviews/:id`: Get a review by id.
- `POST /api/reviews/new`: Add a review to a specific product.
- `PUT /api/reviews/edit/:id`: Delete a review (requires admin access).
- `DELETE /api/reviews/:id`: Delete a review (requires authentication).
- `DELETE /api/reviews/admin/:id'`: Delete a review (requires admin access).

 ## Note

- The `upload.single('image')` middleware is used to handle image file uploads for new products and product updates.
- The `protect` middleware is used to ensure authentication for adding, editing, and deleting products.
- The `adminOnly` middleware is used to restrict certain operations to admin users only.

## Data Models

1. **Cart**

- `user`: The user associated with the cart (optional).
- `products`: An array of products in the cart.
- `total`: The total price of all products in the cart.
- `totalQuantity`: The total quantity of all products in the cart.

2. **Order**

- `user`: The user who placed the order.
- `products`: An array of products in the order.
- `totalPrice`: The total price of the order.
- `shippingAddress`: The shipping address for the order.
- `paymentMethods`: The payment method used for the order.
- `paymentResult`: Details of the payment result (e.g., ID, status, update time).
- `taxPrice`: The tax applied to the order (optional).
- `shippingPrice`: The shipping cost of the order (optional).
- `isPaid`: Indicates if the order is paid or not.
- `paidAt`: The date when the order was paid.
- `status`: The current status of the order (e.g., placed, shipped, delivered).
- `deliveredAt`: The date when the order was delivered (optional).

3. **Product**

- `name`: The name of the product.
- `brand`: The brand of the product.
- `price`: The price of the product.
- `description`: The description of the product.
- `image`: The URL to the product image.
- `category`: The category of the product.
- `rating`: The average rating of the product.
- `countInStock`: The available quantity of the product.

4. **Review**

- `productId`: The ID of the product being reviewed.
- `userId`: The ID of the user who posted the review.
- `rating`: The rating given by the user for the product.
- `comment`: The user's comment about the product.
- `image`: The URL to an image attached to the review (optional).

5. **User**

- `firstName`: The first name of the user.
- `lastName`: The last name of the user.
- `email`: The email address of the user (unique).
- `password`: The hashed password of the user.
- `avatar`: The URL to the user's avatar (optional).
- `isAdmin`: Indicates if the user is an admin or not.

## Contributing

If you want to contribute to this project, you are more than welcome to do so. Fork the repository, make your changes, and create a pull request. Please ensure your changes are well-tested and follow the project's coding conventions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README file serves as a general guide to the backend of the E-Commerce website. Make sure to update this file accordingly if there are any significant changes or additional features added to the backend. Happy coding! 🚀
