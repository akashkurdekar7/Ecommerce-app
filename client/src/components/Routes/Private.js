import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner.js";

const PrivateRoute = () => {
  // take this ok same as the on given in the routes server file as a middleware
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`/api/v1/auth/user-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default PrivateRoute;
