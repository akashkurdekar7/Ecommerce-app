import { createContext, useContext, useEffect, useState } from "react";
import axios  from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios so that we dont write everywhere
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // after using the data wont delted after refresh
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        //the three dots are like to use whatever is typed first
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    // if dependency auth then it will be a error
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
};

//custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
