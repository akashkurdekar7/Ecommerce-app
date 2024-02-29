import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  // Fetch categories on mount
  const getCategories = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
