import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({ myData }) => {
  const { name, video } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="section grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data"> WELCOME TO </p>
            <h1>{name}</h1>
            <p>
              A place where you can find the best recipes for your taste. You
              will be able to search by ingredients, cuisine, or meal type.
            </p>

            <NavLink to="/products">
              <Button>Shop Now</Button>
            </NavLink>
          </div>

          {/* home page image  */}
          <div className="hero-section-image">
            <figure>
              {video}
              {/* <img
                src="images/hero.jpg"
                alt="hero section"
                className="img-style"
              /> */}
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 2.5rem;

  .container {
    display: flex;
    align-items: center;
  }

  .grid {
    height: 100%;
    gap: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .hero-section-data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    figure {
      position: relative;

      &:after {
        width: 60%;
        height: 80%;
        background-color: #fff;
        position: absolute;
        left: 50%;
        z-index: -1;
        content: "";
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding: 9rem 0;
    .grid {
      gap: 1.5rem;
    }
  }
`;

export default HeroSection;
