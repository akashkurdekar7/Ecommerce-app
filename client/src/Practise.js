import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useAuth } from "../src/context/Auth.js";
import useCategory from "./components/hooks/useCategory.js";
import { toast } from "react-hot-toast";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const [auth, setAuth] = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categories = useCategory();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowCategoryDropdown(false); // Close category dropdown when opening the main dropdown
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowDropdown(false); // Close main dropdown when opening the category dropdown
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
  };

  return (
    <NavBar>
      <div className={`navbar ${menuIcon ? "active" : ""}`}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link home-link"
              activeClassName="active"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item dropdown">
            <NavLink
              to="/"
              className="navbar-link home-link"
              activeClassName="active"
              onClick={() => setMenuIcon(false)}
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              {auth.user ? auth.user.name : "Category"}
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="navbar-link dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="navbar-link dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </NavLink>
          </li>
          <li className="navbar-item dropdown">
            <div
              className="navbar-link home-link"
              onMouseEnter={toggleCategoryDropdown}
              onMouseLeave={toggleCategoryDropdown}
            >
              Categories
              {showCategoryDropdown && (
                <ul className="dropdown-menu category-dropdown">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <NavLink
                        to={`/${category.slug}`}
                        className="navbar-link dropdown-item"
                        onClick={() => setMenuIcon(false)}
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              activeClassName="active"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="navbar-link"
                  activeClassName="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="navbar-link"
                  activeClassName="active"
                  onClick={() => setMenuIcon(false)}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : null}
          <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              activeClassName="active"
              onClick={() => setMenuIcon(false)}
            >
              <FiShoppingCart className="cart-trolley" />
            </NavLink>
          </li>
        </ul>
        <div className="mobile-navbar-btn">
          <CgMenu
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </NavBar>
  );
};

const NavBar = styled.nav`
  border: 3px solid black;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 3rem;
  justify-content: space-between;
  padding: 1rem 3rem;

  .navbar {
    display: flex;
    align-items: center;
    position: relative;
  }

  .navbar-lists {
    position: relative;
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .navbar-item {
    position: relative;
  }

  .navbar-link {
    text-decoration: none;
    color: black;
    font-size: 1.8rem;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.3s linear;
    padding: 1rem 2rem;
  }

  .navbar-link:hover {
    color: #333;
  }

  .navbar-link.active {
    color: ${({ theme }) => theme.colors.first};
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    padding: 0.5rem 0;
  }

  .dropdown-menu li {
    list-style-type: none;
  }

  .navbar-item.dropdown:hover .dropdown-menu {
    display: block;
  }

  .category-dropdown {
    z-index: 999;
    position: absolute; /* Change position to absolute */
    top: 100%; /* Position the dropdown below its parent */
    left: 0;
    width: 200px; /* Set width for the category dropdown */
  }

  .cart-trolley--link {
    position: relative;
  }

  .cart-trolley {
    font-size: 2.5rem;
  }

  /* Mobile navbar button */
  .mobile-navbar-btn {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 999;
    }

    .mobile-nav-icon {
      font-size: 2.5rem;
      color: black;
      cursor: pointer;
    }

    .close-outline {
      display: none;
    }

    .active .close-outline {
      display: inline-block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 2.5rem;
      color: black;
      cursor: pointer;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.4s linear;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      transition: all 0.3s linear;
    }

    .navbar-link {
      font-size: 2.5rem;
    }

    .cart-trolley--link .cart-trolley {
      font-size: 4.2rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .navbar-link {
      font-size: 1.5rem;
    }
  }
`;

export default Nav;
