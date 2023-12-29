const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

const products = require('./data/products');
const connectDB = require('./config/db');

const { productsRouter } = require('./routes/productsRoutes')
const { usersRouter } = require('./routes/usersRoutes');
const { ordersRouter } = require('./routes/orderRoutes');
const { cartRouter } = require('./routes/cartRoutes');
const { reviewRouter } = require('./routes/reviewsRoutes');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

connectDB();

// Set up CORS
app.use(cors());

// to accept post json data
app.use(express.json())

// app.use(express.urlencoded())
app.use(express.static('./public'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use(bodyParser.json());

app.use(['/api/products', '/api/product'], productsRouter)
app.use(['/api/users', '/api/user'], usersRouter)
app.use(['/api/orders', '/api/order'], ordersRouter)
app.use(['/api/carts', '/api/cart'], cartRouter)
app.use(['/api/reviews', '/api/review'], reviewRouter)

app.use((req, res, next) => {
    const error = new Error(`Not Found... - ${req.originalurl}`)
    res.status(404);
    next(error);
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode)
    res.json(err.message)
})
// ****************************

// Cluster implementation
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died `);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started listening on port ${port}`);
  });
}
