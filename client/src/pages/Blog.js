import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import Layout from "./../components/Layout";

const Blog = () => {
  // Step 1: Define blog post data
  const blogPosts = [
    {
      title: "Bidriware: The Craft of Metal Inlay",
      imageUrl:
        "https://imgs.search.brave.com/Ln1NTySGlM-nCMkKiWx4_ClEncrRv35tdWfL4OwRKgM/rs:fit:860:0:0/g:ce/aHR0cDovL2Nkbi5z/aG9waWZ5LmNvbS9z/L2ZpbGVzLzEvMDY5/NS8zMDc1L2ZpbGVz/L0NvbGxhZ2VfRm90/b3JfZ3JhbmRlLmpw/Zz82MzQyMjM3NDY0/MTgzMjQwMDU1",
      content:
        "Bidriware is a traditional metal handicraft that originated in the city of Bidar, Karnataka, India. This art form involves creating intricate designs on metal, typically using a combination of zinc and copper, and then treating it with a special oxidizing process to achieve a distinct black color.",
      city: "Bidar, Karnataka, India",
    },
    {
      title: "Channapatna Toys: The Colorful Craft of Karnataka",
      imageUrl:
        "https://imgs.search.brave.com/GoMwbO8uNOYOieBuiu4bXQD-Cbz5hjcO-miBF87idqc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg1LzYw/LzRkLzg1NjA0ZDJl/ZWMxYWQ2NDc3ODBj/OTVkMjIwNzI5OTFh/LS1teXNvcmUta2Fy/bmF0YWthLmpwZw",
      content:
        "Channapatna toys, also known as 'gombegala ooru' (toy-town) in Kannada, are traditional wooden toys that are crafted in the town of Channapatna, Karnataka, India. These toys are made using a special type of wood and colored with natural dyes, making them safe for children.",
      city: "Channapatna, Karnataka, India",
    },
    {
      title: "Mysore Silk: A Regal Tradition",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/05/03/18/32/mysore-1374277_1280.jpg",
      content:
        "Mysore silk is a luxurious fabric known for its smooth texture and rich colors. Produced in the city of Mysore, Karnataka, India, this silk is characterized by its lustrous appearance and intricate designs, often featuring motifs inspired by nature and heritage.",
      city: "Mysore, Karnataka, India",
    },
    {
      title: "Udupi Wood Carvings: Intricate Creations from Coastal Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/12/17/16/41/pottery-1913180_1280.jpg",
      content:
        "Udupi wood carvings are renowned for their intricate designs and craftsmanship. Originating from the coastal town of Udupi in Karnataka, India, these carvings adorn temples, furniture, and decorative items, showcasing the artistic talent of local artisans.",
      city: "Udupi, Karnataka, India",
    },
    {
      title: "Ilkal Sarees: Vibrant Weaves from Northern Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/02/12/22/42/indian-2069618_1280.jpg",
      content:
        "Ilkal sarees are traditional handwoven sarees produced in the town of Ilkal in northern Karnataka, India. Known for their unique weave patterns and vibrant colors, these sarees hold cultural significance and are often worn during festivals and special occasions.",
      city: "Ilkal, Karnataka, India",
    },
    {
      title: "Kundapura Sarees: Elegance from Coastal Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/02/12/22/41/indian-2069616_1280.jpg",
      content:
        "Kundapura sarees are handwoven sarees crafted in the town of Kundapura in coastal Karnataka, India. Made from pure cotton or silk, these sarees are known for their intricate designs and durability, reflecting the coastal heritage and craftsmanship of the region.",
      city: "Kundapura, Karnataka, India",
    },
    {
      title: "Halebidu Temple Sculptures: Architectural Marvels of Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/12/17/16/41/pottery-1913180_1280.jpg",
      content:
        "The temple sculptures of Halebidu, located in Hassan district of Karnataka, India, are renowned for their exquisite craftsmanship and intricate detailing. These sculptures depict scenes from Hindu mythology and showcase the skill of ancient artisans.",
      city: "Halebidu, Karnataka, India",
    },
    {
      title: "Mysore Paintings: Rich Heritage on Canvas",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/12/10/16/39/art-1088140_1280.jpg",
      content:
        "Mysore paintings are a form of classical South Indian art that originated in the city of Mysore, Karnataka, India. These paintings are characterized by their intricate details, vibrant colors, and depiction of mythological themes, showcasing the artistic heritage of the region.",
      city: "Mysore, Karnataka, India",
    },
    {
      title: "Kasuti Embroidery: Traditional Craft of Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/02/23/15/39/craft-1217987_1280.jpg",
      content:
        "Kasuti embroidery is a traditional craft of Karnataka, India, known for its intricate patterns and delicate stitches. Originating from the town of Dharwad, Kasuti embroidery is often used to embellish sarees, dress materials, and home decor items, reflecting the rich cultural heritage of the region.",
      city: "Dharwad, Karnataka, India",
    },
    {
      title: "Gokak Sarees: Handloom Marvels from North Karnataka",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/01/25/17/09/loom-1165353_1280.jpg",
      content:
        "Gokak sarees are handwoven sarees produced in the town of Gokak in North Karnataka, India. Made using traditional handloom techniques, these sarees are known for their unique weave patterns and vibrant colors, reflecting the cultural richness of the region.",
      city: "Gokak, Karnataka, India",
    },
  ];

  // Step 2: Define a state variable
  const [showFullContent, setShowFullContent] = useState(false);

  // Step 3: Event handler function to toggle the state
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container">
          <h1 className="blog_title">Blog</h1>
          <div className="blog">
            {blogPosts.map((post, index) => (
              <div className="blog_post" key={index}>
                <h2 className="blog_post_title">{post.title}</h2>
                <img src={post.imageUrl} alt={post.title} />
                <p className="blog_content">{post.city}</p>
                <Button className="summary_button" onClick={toggleContent}>
                  {showFullContent ? " Close" : "Show Full Post"}
                </Button>
                <div
                  className={`full_content ${showFullContent ? "show" : ""}`}
                >
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  .container {
    display: grid;
  }

  .blog_title {
    width: 100%;
    text-align: center;
    font-size: 3rem;
    margin-top: 20px;
  }
  .blog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(525px, 1fr));
  }
  .blog_post {
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 30px;
    text-align: center;
  }

  .blog_post_title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .blog_content {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .summary_button {
    background-color: initial;
    background-image: linear-gradient(#8614f8 0, #760be0 100%);
    border-radius: 5px;
    border-style: none;
    box-shadow: rgba(245, 244, 247, 0.25) 0 1px 1px inset;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    /* font-family: Inter, sans-serif; */
    font-size: 12px;
    font-weight: 500;
    /* height: 40px; */
    /* line-height: 60px; */
    /* margin-left: -4px; */
    outline: 0;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.05, 0.03, 0.35, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: bottom;
    /* width: 160px; */
  }

  .summary_button:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 1000px) {
    .summary_button {
      font-size: 14px;
      height: 55px;
      line-height: 55px;
      width: 150px;
    }
  }

  .full_content {
    display: none;
  }

  .full_content.show {
    display: block;
  }
`;

export default Blog;
