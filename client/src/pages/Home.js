import Layout from "./../components/Layout";
import React from "react";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const data = {
    name: "kraftopia",
    video: (
      <video
        src="/images/home.mp4"
        alt="hero section"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
        className="img-style"
      />
    ),
  };

  return (
    <Layout>
      <HeroSection myData={data} />
    </Layout>
  );
};

export default Home;
