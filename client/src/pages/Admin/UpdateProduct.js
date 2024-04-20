import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Button } from "./../../styles/Button";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setPhoto(data.product.photo);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  //   getting all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log("API Response:", data);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message); // Display error only when there is an issue
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };

  //update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      name && productData.append("name", name);
      description && productData.append("description", description);
      category && productData.append("category", category);
      price && productData.append("price", price);
      quantity && productData.append("quantity", quantity);
      shipping && productData.append("shipping", shipping);
      photo && productData.append("photo", photo, photo.name);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      //   console.log("data", data);
      if (data?.success) {
        toast.success("product updated successfully");
        // console.log("product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in handle update product");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure? (Type 'yes' or 'no')");

      if (answer === "yes") {
        // Perform the delete action
        toast.success("Deleting...");
        const { data } = await axios.delete(
          `/api/v1/product/delete-product/${id}`
        );
        if (data?.success) {
          toast.success("product Deleted successfully");
          navigate("/dashboard/admin/products");
        } else {
          toast.error(data?.message);
        }
      } else if (answer === "no") {
        // Perform the cancel action
        toast.success("Cancelled.");
        return;
      } else {
        // Handle invalid input
        toast.error('Invalid input. Please type "yes" or "no".');
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in handle delete product");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - update product"}>
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <AdminMenu />
          </div>
          <div className="pannel-content">
            <h1 className="title">update products</h1>
            <div className="form">
              <Select
                placeholder="select a category"
                showSearch
                className="form-select"
                onChange={(value) => setCategory(value)}
                // value={category ? category.name : undefined}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="form-group">
                <label className="photo-label">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="preview">
                {photo ? (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product-photo"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={name}
                  placeholder="give a product name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="textarea"
                  value={description}
                  placeholder="give a product description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  value={price}
                  placeholder="give a product price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  value={quantity}
                  placeholder="give a product quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <Select
                placeholder="Select shipping option"
                className="form-select"
                onChange={(value) => setShipping(value)}
                // value={shipping ? "Yes" : "No"}
                value={shipping}
              >
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>
            </div>
            <div className="form-group-btn">
              <Button className="btn" onClick={handleUpdate}>
                Update
              </Button>

              <Button className="btn" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
const Wrapper = styled.div`
  margin: 1.5rem 3rem;
  padding: 0;
  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .pannel {
    width: 100vw;
    display: flex;
    gap: 1rem;

    .pannel-items {
      width: 20%;
    }
  }
  .pannel-content {
    width: 70%;
    flex-grow: 1;

    .card {
      width: 100%;
      padding: 3rem;
    }
  }
  .form-select {
    width: 100px;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    text-transform: none;
    box-shadow: none;
    width: 50%;
    border-radius: 5px;
  }
  .form-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
  .form-group-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
  .form-select {
    margin-bottom: 1rem;
    width: 50%;
  }
  .photo-label {
    padding: 0.5rem;
    width: max-content;
    border-radius: 5px;
    background-color: grey;
    font-size: 2rem;
  }
  .btn {
    width: max-content;
    margin: 0 0.5rem;
    font-size: 1.5rem;
  }
`;

export default UpdateProduct;
