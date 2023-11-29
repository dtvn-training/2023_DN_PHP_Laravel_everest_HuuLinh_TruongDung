import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../assets/scss/layouts/Page.scss";
import Banner from "../components/Banner";
import { getProfile } from "../redux/slices/ProfileSlice";

const DefaultLayout = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsloading(true);
      try {
        await dispatch(getProfile()).unwrap();
      } catch (e) {
        console.error(e);
        navigate("/login");
      } finally {
        setIsloading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Banner />
          <Header />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar />
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
