import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      // decremnet the count
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);

  return (
    <>
      <Wrapper>
        <h1 className="text">Redirecting to you in {count} seconds</h1>
        <div className="loader"></div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    font-size: 2rem;
    position: absolute;
    top: 36%;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.textLight};
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
