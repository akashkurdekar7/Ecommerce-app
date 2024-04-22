import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

const Contact = () => {
  return (
    <Layout>
      <Wrapper>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Feel free to reach out to us with any
          questions or feedback you may have.
        </p>
        <div className="contact-info">
          <p>Email: kraftopia@gmail.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main St, Bangalore, Karnataka, India</p>
        </div>

        <iframe
          title="Karnataka Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d389458.63647938895!2d75.06860735404049!3d15.317277500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf81b18bf85e51%3A0xa1f3fbc6e175eeb2!2sKarnataka!5e0!3m2!1sen!2sin!4v1619022866534!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0, marginTop: "20px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .contact-info {
    margin-top: 20px;
  }
`;

export default Contact;
