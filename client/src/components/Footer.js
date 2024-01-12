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
      <div className="footer-container">
        <div className="footer grid grid-five-column">
          <div className="intro-desc">
            <Logo src="/images/Klogo.png" alt="my logo image" />
            <p>loremsafdosafsafljsadkfj safsfas asf</p>
          </div>

          <div className="subscribe">
            <h2 className="title">subscribe to get important updates</h2>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              id="email"
            />
            <Button>Subscribe</Button>
          </div>

          <div className={menuIcon ? "navbar active" : "navbar"}>
            <ul className="navbar-lists">
              <li>
                <NavLink
                  to="/"
                  className="navbar-link home-link "
                  activeclassname="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="navbar-link"
                  activeclassname="active"
                  onClick={() => setMenuIcon(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="navbar-link "
                  activeclassname="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="navbar-link "
                  activeclassname="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="navbar-link "
                  activeclassname="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Blog
                </NavLink>
              </li>

              {/* <li>
                  <NavLink to="/districts" className="navbar-link">Districts</NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="navbar-link">Categories</NavLink>
                </li>
                 */}
            </ul>
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

          <div className="contact">
            <h2 className="title">Call us</h2>
            <p>
              <abbr title="contact me">
                <NavLink href="tel:+9916390580">+919916390580</NavLink>
              </abbr>
            </p>
          </div>
        </div>

        <div className="line"></div>

        <div className="bottom grid grid-two-column">
          <div className="copy-right">
            &copy; 2023 <strong href="/">Kraftopia</strong>. All rights
            reserved.
          </div>

          <div className="privacy">
            <h2 className="title">Privacy policy</h2>
            <h2 className="title">terms and conditions</h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  // padding: 9rem 3rem;
  .footer-container {
    background-color: ${({ theme }) => theme.colors.firstLight};
  }
  .line {
    width: 100%;
    border: 1px solid black;
  }

  .footer {
    // margin-top: 1rem;
    align-items: center;
    color: ${({ theme }) => theme.colors.black};
    padding: 20px 0;
    text-align: center;
  }

  .intro-desc {
    font-size: 2rem;
    color: black;
  }
  .subscribe {
    row-gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .subscribe input {
    border-radius: 1rem;
    height: 4rem;
  }
  .subscribe Button {
    display: flex;

    align-items: center;
    height: 4rem;
  }
  .title {
    font-size: 2rem;
    text-transform: capitalize;
  }

  .navbar-lists {
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
  .navbar-lists ul {
    display: grid;
    row-gap: 1rem;
  }

  .navbar-link,
  .navbar-link:link,
  .navbar-link:visited {
    display: inline-block;
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: 500;
    // color: ${({ theme }) => theme.colors.black};
    transition: color 0.4s linear;
  }
  .active {
    color: ${({ theme }) => theme.colors.first};
  }
  .navbar-link:hover,
  .navbar-link:active {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.first};
  }
  .social-group {
    text-align: center;
  }
  .social-group ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 2rem auto 0;

    width: max-content;
    gap: 3rem;
  }
  .social-group ul li {
    width: max-content;
    margin: auto;
  }
  .social-link {
    font-size: 5rem;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.black};
    border-radius: 50%;
  }
  .social-link:hover {
    color: ${({ theme }) => theme.colors.first};
  }
  .contact p a {
    color: ${({ theme }) => theme.colors.black};
  }
  .contact p abbr {
    text-decoration: none;
  }
  .contact p a:hover {
    color: ${({ theme }) => theme.colors.first};
  }
  .bottom {
    text-align: center;
    gap: 1rem;
  }

  .copy-right {
    margin-top: 1rem;
    font-size: 2rem;
  }
  .copy-right strong:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.first};
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .footer-container {
      grid-template-column: 1fr;
    }
  }
`;
const Logo = styled.img`
  width: max-content;
  height: 5rem;
  display: flex;
  margin: 1rem auto 0;
`;
export default Footer;
