//use of slugify make the website SEO to better like if products/page using slugify it shows products-page-1,2,3,4,

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
