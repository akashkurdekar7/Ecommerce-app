import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "./../../styles/Button";
import CategoryForm from "../../Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} category created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data?.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdated("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  const handleDeleteSubmit = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success(`${data.category.name} is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <Layout title={"Dashboard - Create Categories"}>
      <Wrapper className="section">
        <div className="panel grid grid-two-column">
          <div className="panel-items">
            <AdminMenu />
          </div>
          <div className="panel-content">
            <h1 className="title">Manage Categories</h1>
            <div className="form">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                placeholder="Enter category name"
                buttonText="Create Category"
              />
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <Button
                          className="btn"
                          onClick={() => {
                            setVisible(true);
                            setUpdated(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          className="btn"
                          onClick={() => handleDeleteSubmit(c._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              visible={visible}
              footer={null}
              onCancel={() => setVisible(false)}
            >
              <CategoryForm
                handleSubmit={handleUpdateSubmit}
                value={updated}
                setValue={setUpdated}
                placeholder="Enter updated category name"
                buttonText="Update Category"
              />
            </Modal>
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

  .panel {
    display: flex;
    gap: 1rem;
  }

  .panel-items {
    width: 20%;
  }

  .panel-content {
    width: 80%;
    flex-grow: 1;

    .form {
      margin-bottom: 2rem;
    }

    .table-container {
      overflow-x: auto;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      font-size: 1.8rem;
      text-transform: uppercase;
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    td {
      font-size: 1.6rem;
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: ${({ theme }) => theme.colors.first};
      color: ${({ theme }) => theme.colors.white};
      font-weight: bold;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .btn {
      margin-right: 1rem;
      font-size: 1.6rem;
      padding: 0.5rem 1rem;
    }
  }
`;

export default CreateCategory;
