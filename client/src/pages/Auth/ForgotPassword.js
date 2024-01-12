import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success("Password Changed Successfully");
        //to acceess the local storage use useeffedct in auth
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(`Changing Password Failed`);
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce app"}>
      <Wrapper>
        <div className="fp-con">
          <h1 className="primary-title">Reset Password</h1>

          <form onSubmit={handleSubmit}>
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
              <label htmlFor="newpassword" className="form_label">
                New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="passwordInput"
                placeholder="New Password"
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
                id="answerInput"
                placeholder="Answer"
                className="form_control"
                required
              />
            </div>

            <Button type="submit">Reset</Button>
          </form>
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
  .fp-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  input[type="email"],
  input[type="text"] {
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    min-height: 92vh;
    .fp-con {
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
    input[type="email"] {
      font-size: 2rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    min-height: 90vh;
    .fp-con {
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
    input[type="email"] {
      font-size: 2rem;
    }
  }
`;
export default ForgotPassword;
