import slugify from "slugify";
import Products from "../models/productModel.js";
// Use fs.promises for asynchronous file operations
import fs from "fs/promises";

// creating a new product
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // Check if all fields are filled out
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "description is required" });
      case !price:
        return res.status(500).send({ message: "Price is required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Photo is required should be less then 1MB" });
    }

    const product = await new Products({
      ...req.fields,
      slug: slugify(name),
    });

    // if (photo) {
    //   product.photo.data = fs.readFileSync(photo.path);
    //   product.photo.contentType = photo.type;
    // }
    // Read file asynchronously and handle errors
    try {
      product.photo.data = await fs.readFile(photo.path);
      product.photo.contentType = photo.type;
    } catch (fileReadError) {
      return res.status(500).send({
        success: false,
        message: "Error reading photo file",
        error: fileReadError.message,
      });
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Product controller",
      error: error.message,
    });
  }
};

//update the product database
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "description is required" });
      case !price:
        return res.status(500).send({ message: "Price is required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case !photo || (photo && photo.size > 1000000):
        // return res
        //   .status(500)
        //   .send({ message: "Photo is required should be less then 1MB" });
        break;
    }

    // Find the product by ID
    const product = await Products.findByIdAndUpdate(
      req.params.pid,
      { slug: slugify(name) },
      { new: true }
    );
    if (!product) {
      return res.status(404).send({
        success: false,
        message: `Product with ID ${req.params.pid} not found`,
      });
    }
    // Update the product fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (category) product.category = category;
    if (shipping) product.shipping = shipping;
    product.slug = slugify(name);

    // Update photo if available
    if (photo) {
      product.photo.data = await fs.readFile(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating product controller",
      error: error.message,
    });
  }
};

//get all the product
export const productController = async (req, res) => {
  try {
    const product = await Products.find({})
      .populate("category")
      // .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      countTotal: product.length,
      success: true,
      message: "all Prodcuts list",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all the Products",
      error: error.message,
    });
  }
};

// get single product
export const singleProductController = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      message: "got the single category",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting single category",
      error: error.message,
    });
  }
};

//get the single product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.pid }).select(
      "photo"
    );
    if (product && product.photo && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Photo",
      error: error.message,
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete({
      _id: req.params.pid,
    }).select("-photo");
    res.status(200).send({
      message: "product Deleted Successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `the ${req.params.id} product doesnt exists`,
      error: error.message,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Products.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in filter controller",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await Products.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in product count controller",
      error,
    });
  }
};

// product list based on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await Products.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in product list controller",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Products.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in search api controller",
      error,
    });
  }
};
