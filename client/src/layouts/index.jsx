import api from "../api/axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileReducer } from "../redux/slices/ProfileSlice";

const DefaultLayout = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      setIsloading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await api.get("/api/auth/profile");
          if (res.data.id) {
            dispatch(profileReducer.actions.getProfile(res.data));
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
            <Sidebar />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
