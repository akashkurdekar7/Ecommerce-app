import React from "react";
import { styled } from "styled-components";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Create new category:"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .form {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-group {
      width: 100%;
      margin-bottom: 1rem;
      .form-control {
        width: 100%;
        border-radius: 10px;
      }
    }
    .btn {
      width: 20%;
      border-radius: 10px;
      color: white;
      background-color: red;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default CategoryForm;
