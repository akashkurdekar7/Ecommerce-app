import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  singleProductController,
  productPhotoController,
  productController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all product
router.get("/get-product", productController);

// get single product
router.get("/get-product/:slug", singleProductController);

// get product Photo
router.get("/product-photo/:pid", productPhotoController);

// delete  product
router.delete("/delete-product/:pid", deleteProductController);

//filter products
router.post("/product-filter", productFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search products
router.get("/search/:keyword", searchProductsController);
export default router;
