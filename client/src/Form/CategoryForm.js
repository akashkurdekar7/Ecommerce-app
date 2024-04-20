import React from "react";
import { styled } from "styled-components";
import { Button } from "./../styles/Button";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 2rem;

    .form-group {
      width: max-content;
      display: flex;
      /* margin-bottom: 1.5rem; */

      .form-control {
        text-transform: none;
        width: 100%;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid ${({ theme }) => theme.colors.gray};
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    ${Button} {
      border-radius: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }
`;

export default CategoryForm;
