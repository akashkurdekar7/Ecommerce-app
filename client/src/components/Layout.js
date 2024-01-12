import React from "react";
import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Toaster />
        {children}
      </Wrapper>
      <Footer />
    </div>
  );
};
const Wrapper = styled.main`
  min-height: 100vh;
`;
Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "MERN Ecommerce application",
  keywords:
    "mern,javascript,node,express,mongodb,ecommerce,application,shoping,react,html,css",
  author: "Akash",
};
export default Layout;
