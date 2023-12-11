import { useEffect, useState } from "react";
import "../assets/scss/components/Banner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api/axios";

const initState = {
  resData: {
    data: [],
  },
};

const Banner = () => {
  const [pageState, setPageState] = useState(initState);

  useEffect(() => {
    getAdBannerFirstReload();
  }, []);

  const handleChange = (name, value) => {
    setPageState((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  const getAdBannerFirstReload = async () => {
    try {
      const res = await api.get("/api/banner");
      handleChange("resData", res.data);
      await api.get(`api/banner/impression/${res.data.data[0].id}`);
    } catch (error) {}
  };

  const getAdBanner = async () => {
    try {
      const res = await api.get("/api/banner");
      handleChange("resData", res.data);
    } catch (error) {}
  };

  const createImpression = async (current) => {
    if (pageState.resData.data.length > 1) {
      const currentData = pageState.resData.data[current];
      if (currentData) {
        try {
          await api.get(`api/banner/impression/${currentData.id}`);
        } catch (error) {
          console.error(error);
        } finally {
          getAdBanner();
        }
      }
    }
  };

  return (
    <div className="banner-container">
      <Slider
        dots={true}
        pauseOnHover={false}
        speed={1000}
        autoplaySpeed={7000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        afterChange={createImpression}
      >
        {pageState.resData.data.map((item, index) => {
          return (
            <div key={index} className="banner-container">
              <img src={item.creatives[0].preview_image} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
