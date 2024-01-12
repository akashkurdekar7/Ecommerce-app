import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data && res.data.success) {
        toast.success("registered successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Regsiteration failed");
    }
    // console.log(process.env.REACT_APP_API);
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <Wrapper>
        <div className="register-con">
          <h1 className="primary-title">Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <label htmlFor="username" className="form_label">
                Username:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="username"
                placeholder="Username"
                className="form_control"
                required
              />
            </div>

            <div className="form-inputs">
              <label htmlFor="email" className="form_label">
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
              <label htmlFor="password" className="form_label">
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

            <div className="form-inputs">
              <label htmlFor="phone" className="form_label">
                Phone:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                placeholder="Phone Number"
                className="form_control"
                required
              />
            </div>

            <div className="form-inputs">
              <label htmlFor="address" className="form_label">
                Address:
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                id="address"
                className="form_control"
                required
              />
            </div>

            <div className="form-inputs">
              <label htmlFor="answer" className="form_label">
                Answer:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                id="answer"
                placeholder="Answer"
                className="form_control"
                required
              />
            </div>

            <Button type="submit">Register</Button>
          </form>

          <p className="login-route">
            Already registered?{" "}
            <NavLink className="login-route" to="/login">
              Login
            </NavLink>
          </p>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  min-height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
  .register-con {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form {
    width: 40%;
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
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="password"],
  input[type="tel"],
  input[type="email"] {
    margin-top: 0.5rem;
    width: 100%;
    text-transform: none;
    padding: 0.8rem;
    font-size: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    outline: none;
    &:focus {
      box-shadow: 0 0px 4px 1px ${({ theme }) => theme.colors.first};
    }
  }

  .login-route {
    margin-top: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 1.5rem;
  }

  .login-route:visited {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    min-height: 92vh;
    .register-con {
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
    .form_control::placeholder {
      font-size: 12px;
    }
    .login-route {
      margin: 0;
      font-size: 2rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    min-height: 90vh;
    .register-con {
      width: 80%;
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
    .form_control::placeholder {
      font-size: 16px;
    }
    .login-route {
      margin: 0;
      font-size: 2rem;
    }
  }
`;

export default Register;
