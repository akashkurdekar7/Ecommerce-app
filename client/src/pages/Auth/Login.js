import React, { useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        //to save the data even if uh restart or refresh the page
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data && res.data.message);
        //to acceess the local storage use useeffedct in auth
        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("If New User Please Register :)");
    }
  };

  return (
    <Layout title={"Login - Ecommerce app"}>
      <Wrapper>
        <div className="login-con">
          <h1 className="primary-title">Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <label htmlFor="emailInput" className="form_label">
                Email:
              </label>
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="emailInput"
                placeholder="Email"
                className="form_control"
                required
              />
            </div>

            <div className="form-inputs">
              <label htmlFor="passwordInput" className="form_label">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="passwordInput"
                placeholder="Password"
                className="form_control"
                required
              />
            </div>
            <Button
              className="forgot-password"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </Button>
            <Button type="submit">Login</Button>
          </form>

          <p className="register-route">
            New Here?
            <NavLink className="register-route" to="/register">
              &nbsp;Register
            </NavLink>
          </p>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  .login-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .forgot-password {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.textLight};
    padding: 0 0 1rem 0;
    text-transform: capitalize;
    font-size: 1.5rem;
    &:hover,
    &:active {
      box-shadow: none;
      transform: none;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 1;
    padding-bottom: 1rem;
  }

  .form-inputs {
    margin-bottom: 1.5rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 1rem !important;
  }

  input[type="password"],
  input[type="email"] {
    width: 100%;
    text-transform: none;
    margin-top: 0.5rem;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    outline: none;
    &:focus {
      box-shadow: 0 0px 4px 1px ${({ theme }) => theme.colors.first};
    }
  }

  .register-route {
    margin-top: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 1.5rem;
  }

  .register-route:visited {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    min-height: 92vh;
    .login-con {
      width: 100%;
    }
    h1 {
      font-size: 3.5rem;
      margin: 1rem 0;
    }

    form {
      width: 60%;
    }
    label {
      font-size: 1.8rem;
    }
    input[type="text"],
    input[type="password"],
    input[type="tel"],
    input[type="email"] {
      font-size: 2rem;
    }
    .register-route {
      margin: 0;
      font-size: 2rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    min-height: 90vh;
    .login-con {
      width: 80%;
    }
    h1 {
      font-size: 4rem;
      margin: 1rem 0;
    }

    form {
      width: 60%;
    }
    label {
      font-size: 1.8rem;
    }
    input[type="text"],
    input[type="password"],
    input[type="tel"],
    input[type="email"] {
      font-size: 2rem;
    }
    .register-route {
      margin: 0;
      font-size: 2rem;
    }
  }
`;

export default Login;
