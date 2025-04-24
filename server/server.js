import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import StripeWebhook from './controllers/orderController.js';
const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Connect to Database
await connectDB();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'https://setup-3drw.vercel.app'];  // Add any production URLs if needed

app.post('/stripe', express.raw({type: 'application/json'}),StripeWebhook)
// Middleware Configuration
app.use(express.json());  // Parse JSON bodies
app.use(cookieParser());  // Parse cookies
app.use(cors({
  origin: allowedOrigins, 
  credentials: true,  // Allow credentials (cookies)
}));

// Default route
app.get('/', (req, res) => {
  res.send("API IS WORKING");
});





// User routes
app.use('/api/user', userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter)

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
