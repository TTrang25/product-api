require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} - v2`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });