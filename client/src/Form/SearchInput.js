import React from "react";
import { styled } from "styled-components";
import { useSearch } from "../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <form className="search_form" role="search" onSubmit={handleSubmit}>
        <input
          className="search_input"
          type="search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          placeholder="Search..."
        />
        <button type="submit" className="search_button">
          Search
        </button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .search_form {
    display: flex;
    align-items: center;
  }

  .search_input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 14px;
    outline: none;
  }

  .search_button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }

  .search_button:hover {
    background-color: #0056b3;
  }
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    display: none;
  }
`;
export default SearchInput;
