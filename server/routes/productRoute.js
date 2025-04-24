import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, ProductById, ProductList } from '../controllers/productController.js';

const productRouter = express.Router();

// Add Product: POST /api/product/add
productRouter.post('/add', upload.array('images'), authSeller, addProduct);

// Get Product List: GET /api/product/list
productRouter.get('/list', ProductList);

// Get Single Product: GET /api/product/:id
productRouter.get('/:id', ProductById);  // Use dynamic parameter for ID

// Change Product Stock: POST /api/product/stock
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
