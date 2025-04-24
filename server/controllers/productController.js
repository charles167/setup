import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add Product: POST /api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    // If inStock is not passed, set it to true by default
    const inStock = productData.inStock !== undefined ? productData.inStock : true;

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create the product with the inStock field
    await Product.create({ 
      ...productData, 
      image: imagesUrl, 
      inStock // Ensure inStock is set
    });

    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product List: GET /api/product/list
export const ProductList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Product: GET /api/product/:id
export const ProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Product Stock: POST /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
