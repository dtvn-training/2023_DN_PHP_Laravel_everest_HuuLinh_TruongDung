import axios from "../api/axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [data, setData] = useState({
    name: "unknown",
    email: "example@gmail.com",
  });
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      setIsloading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await axios.get("/api/auth/profile");
          if (res.data.id) {
            setData(res.data);
          } else {
            navigate("/login");
          }
        } catch (e) {
          console.error(e);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setIsloading(false);
    };
    getProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar name={data.name} />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
