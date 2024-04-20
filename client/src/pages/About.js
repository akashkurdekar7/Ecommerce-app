import React from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";

const About = () => {
  const data = {
    name: "Team Alpha",
    video: (
      <video
        src="/images/about.mp4"
        alt="hero section"
        width="100%"
        height="325rem"
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

export default About;
