import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import Layout from "./../components/Layout";

const Blog = () => {
  // blog post data
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
        "https://imgs.search.brave.com/kfJZb-W_9rpC0VSXezwQuWKC7Jy7bcwqLuAVmKrYmJo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IyL015c29yZV9T/aWxrX1NhcmVlLmpw/Zw",
      content:
        "Mysore silk is a luxurious fabric known for its smooth texture and rich colors. Produced in the city of Mysore, Karnataka, India, this silk is characterized by its lustrous appearance and intricate designs, often featuring motifs inspired by nature and heritage.",
      city: "Mysore, Karnataka, India",
    },
    {
      title: "Udupi Wood Carvings: Intricate Creations from Coastal Karnataka",
      imageUrl:
        "https://imgs.search.brave.com/HxJXL-zY4d6JpwFKC1dr9iNFyNeLgtC8YfwcHft8SJQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9MUS9FRS9IVC9T/RUxMRVItMjQ3MzY1/MC9jYW5ub24tYm9k/aGktc2F0aHdhLS0y/NTB4MjUwLmpwZw",
      content:
        "Udupi wood carvings are renowned for their intricate designs and craftsmanship. Originating from the coastal town of Udupi in Karnataka, India, these carvings adorn temples, furniture, and decorative items, showcasing the artistic talent of local artisans.",
      city: "Udupi, Karnataka, India",
    },
    {
      title: "Ilkal Sarees: Vibrant Weaves from Northern Karnataka",
      imageUrl:
        "https://imgs.search.brave.com/auiUya9VGD8GHST659os0i_zP-5N1iD6G55QXgN4y5w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzc0L2Y1/LzFlLzc0ZjUxZWZj/MjljMGJjYWRiNGY4/YzY5YTYzYmQyNmI5/LmpwZw",
      content:
        "Ilkal sarees are traditional handwoven sarees produced in the town of Ilkal in northern Karnataka, India. Known for their unique weave patterns and vibrant colors, these sarees hold cultural significance and are often worn during festivals and special occasions.",
      city: "Ilkal, Karnataka, India",
    },
    {
      title: "Kundapura Sarees: Elegance from Coastal Karnataka",
      imageUrl:
        "https://imgs.search.brave.com/vOZlzcl2HwE8dANSRCHjc0Uk6vVEmW0hIIOH3LZhCes/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zb3V0/aGxvb20uY29tL2Nk/bi9zaG9wL2FydGlj/bGVzL2t1dDRfNTMz/eC5qcGc_dj0xNTg0/NjA3Njk3",
      content:
        "Kundapura sarees are handwoven sarees crafted in the town of Kundapura in coastal Karnataka, India. Made from pure cotton or silk, these sarees are known for their intricate designs and durability, reflecting the coastal heritage and craftsmanship of the region.",
      city: "Kundapura, Karnataka, India",
    },
    {
      title: "Mysore Paintings: Rich Heritage on Canvas",
      imageUrl:
        "https://imgs.search.brave.com/GR01ODFLfoMpO5639jYf4V-JvC7A6kQsKlLuYY3hTzk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbS5o/dW50LmluL2NnL015/c29yZS9DaXR5LUd1/aWRlL1BBSU5USU5H/X0czSjJPUV82MzQ2/NTFmLmpwZw",
      content:
        "Mysore paintings are a form of classical South Indian art that originated in the city of Mysore, Karnataka, India. These paintings are characterized by their intricate details, vibrant colors, and depiction of mythological themes, showcasing the artistic heritage of the region.",
      city: "Mysore, Karnataka, India",
    },
    {
      title: "Kasuti Embroidery: Traditional Craft of Karnataka",
      imageUrl:
        "https://imgs.search.brave.com/KA5RBI138pKr9bZMwRyREhXcVP0tQsCxkrHORPH2omc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2JjLzQ1/LzQ2L2JjNDU0Njc3/ZDdlM2VjOTA2Y2Y2/MWRlYTViNDZhZTQ2/LmpwZw",
      content:
        "Kasuti embroidery is a traditional craft of Karnataka, India, known for its intricate patterns and delicate stitches. Originating from the town of Dharwad, Kasuti embroidery is often used to embellish sarees, dress materials, and home decor items, reflecting the rich cultural heritage of the region.",
      city: "Dharwad, Karnataka, India",
    },
  ];

  const [showFullContent, setShowFullContent] = useState(false);

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
    background-image: linear-gradient(#22c55e 100%, #a9ffc9 100%);
    border-radius: 5px;
    border-style: none;
    box-shadow: rgba(245, 244, 247, 0.25) 0 1px 1px inset;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
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
      font-size: 10px;
      /* height: 55px; */
      /* line-height: 55px; */
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
