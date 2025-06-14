import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

// middleware\
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => {

  res.send('Welcome to the Expense Tracker API');

});

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
  });
});