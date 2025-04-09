const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '../../.env' });

// Import the Product model
const Product = require('../models/product.model');

// MongoDB connection string from environment variables or use a default
const DB_URI = process.env.DB_URL || 'mongodb://localhost:27017/shopbookvuong';

// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  
  // Run the migration
  return Product.migrateToMultipleCategories();
})
.then(result => {
  console.log('Migration Result:', result);
  if (result.migratedCount > 0) {
    console.log(`Successfully migrated ${result.migratedCount} products to multiple categories format`);
  } else {
    console.log('No products needed migration');
  }
})
.catch(err => {
  console.error('Migration error:', err);
})
.finally(() => {
  // Close the database connection
  mongoose.connection.close()
    .then(() => console.log('Database connection closed'))
    .catch(err => console.error('Error closing database connection:', err));
});

console.log('Starting category migration...');
