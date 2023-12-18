import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../assets/scss/layouts/Page.scss";
import Banner from "../components/Banner";
import { getProfile } from "../redux/slices/ProfileSlice";
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        await dispatch(getProfile()).unwrap();
      } catch (e) {
        console.error(e);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <>
      {loading ? (
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

DefaultLayout.propTypes={
  children: PropTypes.node.isRequired
}

export default DefaultLayout;
