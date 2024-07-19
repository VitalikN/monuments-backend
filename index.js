const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

if (!DB_HOST) {
  throw new Error('DB_HOST is not defined');
}

console.log('Attempting to connect to MongoDB...');

const dbConnection = async () =>
  mongoose
    .connect(DB_HOST, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.log('MongoDB connection error:', error);
      process.exit(1);
    });

const startServer = () => {
  app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const init = async () => {
  await dbConnection();
  startServer();
};

init();

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT);
//     console.log('Database connection successful');
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
//
//
