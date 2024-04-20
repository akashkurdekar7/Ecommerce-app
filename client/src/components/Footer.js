import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  const [menuIcon, setMenuIcon] = useState();

  return (
    <Wrapper className="footer-container">
      <div className="footer">
        <div className="intro-desc">
          <Logo src="/images/Klogo.png" alt="my logo image" />
          <p>loremsafdosafsafljsadkfj safsfas asf</p>
        </div>

        <div className="subscribe">
          <h2 className="title">Subscribe to get important updates</h2>
          <InputContainer>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              id="email"
            />
            <Button>Subscribe</Button>
          </InputContainer>
        </div>

        <div className="navbar-lists">
          <NavLink
            to="/"
            className="navbar-link"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="navbar-link"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/products"
            className="navbar-link"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className="navbar-link"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/blog"
            className="navbar-link"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Blog
          </NavLink>
        </div>

        <div className="social-group">
          <h2 className="title">Follow us</h2>
          <ul>
            <li>
              <NavLink to="#" className="social-link">
                <AiOutlineInstagram />
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="social-link">
                <AiOutlineTwitter />
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="social-link">
                <AiOutlineYoutube />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="line"></div>

      <div className="bottom">
        <div className="copy-right">
          &copy; 2023 <strong>Kraftopia</strong>. All rights reserved.
        </div>

        <div className="privacy">
          <NavLink to="#" className="title">
            Privacy policy
          </NavLink>
          <NavLink to="#" className="title">
            Terms and conditions
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.firstLight};
  padding: 3rem;
  color: ${({ theme }) => theme.colors.black};

  .footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    align-items: center;
  }

  .intro-desc {
    text-align: center;
  }

  .subscribe {
    text-align: center;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .navbar-lists {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .navbar-link {
    display: inline-flex;
    flex-direction: column;
    text-decoration: none;
    font-size: 2rem;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.colors.black};
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
    }
  }

  .navbar-link.active {
    color: ${({ theme }) => theme.colors.first};
  }

  .social-group {
    text-align: center;
  }

  .social-group ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .social-link {
    font-size: 2rem;
    margin: 0 1rem;
    color: ${({ theme }) => theme.colors.black};
    transition: color 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
    }
  }

  .contact {
    text-align: center;
  }

  .contact p {
    margin: 0;
  }

  .copy-right {
    font-size: 1.3rem;
  }

  .copy-right strong {
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.first};
    }
  }

  .line {
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.black};
    margin: 2rem 0;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .privacy {
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .footer {
      grid-template-columns: 1fr;
    }
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  input[type="email"] {
    border: 1px solid ${({ theme }) => theme.colors.black};
    padding: 0.5rem;
    border-radius: 5px;
    flex: 1;
    max-width: 300px;
    font-size: 1.2rem;
  }

  ${Button} {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
`;

export default Footer;
