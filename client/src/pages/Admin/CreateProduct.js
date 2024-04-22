import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Button } from "./../../styles/Button";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log("data", data);
      if (data?.success) {
        toast.success("product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in handle create product");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create product's"}>
      <Wrapper className="container">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <AdminMenu />
          </div>
          <div className="pannel-content">
            <h1 className="title">Create products</h1>
            <div className="form">
              <Select
                placeholder="select a category"
                showSearch
                className="form-select"
                onChange={(value) => setCategory(value)}
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
                {photo && (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
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
                <textarea
                  rows="4"
                  value={description}
                  placeholder="Give a product description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "50%",
                    maxWidth: "100%",
                    minHeight: "100px",
                    borderRadius: "5px",
                    padding: "0.5rem",
                    boxSizing: "border-box",
                    textTransform: "none",
                  }}
                ></textarea>
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
              >
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>
            </div>
            <div className="form-group">
              <Button className="btn" onClick={handleCreate}>
                Create a Product
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
    text-transform: capitalize;
    font-weight: 700;
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
  .preview {
    margin-bottom: 1rem;
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
    width: 50%;
  }
`;
export default CreateProduct;
