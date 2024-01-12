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

  //handle form submission
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      console.log("Server Response:", data); // Log the response
      if (data?.success) {
        toast.success(`${name} category created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in the input form ");
    }
  };

  //to get all category
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

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle updated form submission
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
      toast.error("something went wrong while updating");
    }
  };

  // handle delete form category submission
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
      toast.error("something went wrong while Deleting");
    }
  };

  return (
    <Layout title={"Dashboard - Create category's"}>
      <Wrapper className="section">
        <div className="pannel grid grid-two-column">
          <div className="pannel-items">
            <AdminMenu />
          </div>
          <div className="pannel-content">
            <h1 className="title">Manage category</h1>
            <div className="form">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="table_div">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
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
                          onClick={() => {
                            handleDeleteSubmit(c._id);
                          }}
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
  justify-content: center;
  display: flex;
  align-items: center;
  .title {
    font-size: 5rem;
    text-transform: capitalize;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .pannel {
    width: 100vw;
    display: flex;
    gap: 1rem;
  }
  .pannel-items {
    width: 20%;
  }
  .pannel-content {
    width: 70%;
    flex-grow: 1;

    .card {
      width: 100%;
      padding: 3rem;
    }
  }
  .table_div {
    margin-top: 2rem;
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th {
    font-size: 3rem;
    text-transform: uppercase;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  td {
    font-size: 2rem;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
  .btn {
    margin-right: 1rem;
  }
`;
export default CreateCategory;
