

import express from 'express';
import { isSellerAuth, sellerLogin, sellerlogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerLogin);
sellerRouter.post('/is-auth',authSeller,isSellerAuth);
sellerRouter.post('/logout',sellerlogout);

export default sellerRouter;
