import { useEffect, useState } from "react";
import "../assets/scss/components/Banner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api/axios";

const initState = {
  data: [
    {
      id: 1,
      campaign_name: "dsadasdas",
      status: 0,
      used_amount: 0,
      usage_rate: 0.1,
      budget: 100000,
      bid_amount: 100,
      start_date: "2023-12-04 08:58:00",
      end_date: "2023-12-07 08:58:00",
      user_updated: 1,
      delete_flag: 0,
      created_at: "2023-12-06T01:59:56.000000Z",
      updated_at: "2023-12-11T01:45:20.000000Z",
      creatives: [
        {
          id: 1,
          creative_name: "fwfsfythyuhy",
          preview_image:
            "https://res.cloudinary.com/dhwnjxngk/image/upload/v1702257538/x5ddag04zhryycyoyfoh.png",
          final_url: "dsfsdfsf",
          description: "sfsdfsf",
          id_campaign: 1,
          created_at: "2023-12-06T01:59:56.000000Z",
          updated_at: "2023-12-11T01:18:57.000000Z",
        },
      ],
    },
    {
      id: 2,
      campaign_name: "dsadasdas",
      status: 0,
      used_amount: 0,
      usage_rate: 0.1,
      budget: 100000,
      bid_amount: 100,
      start_date: "2023-12-04 08:58:00",
      end_date: "2023-12-07 08:58:00",
      user_updated: 1,
      delete_flag: 0,
      created_at: "2023-12-06T01:59:56.000000Z",
      updated_at: "2023-12-11T01:45:20.000000Z",
      creatives: [
        {
          id: 2,
          creative_name: "fwfsfythyuhy",
          preview_image:
            "https://res.cloudinary.com/dhwnjxngk/image/upload/v1702257538/x5ddag04zhryycyoyfoh.png",
          final_url: "dsfsdfsf",
          description: "sfsdfsf",
          id_campaign: 2,
          created_at: "2023-12-06T01:59:56.000000Z",
          updated_at: "2023-12-11T01:18:57.000000Z",
        },
      ],
    },
  ],
};

const Banner = () => {
  const [pageState, setPageState] = useState(initState);

  useEffect(() => {
    getAdBanner();
    fetchData();
  }, []);

  const getAdBanner = async () => {
    try {
    } catch (error) {
      
    }
  };

  const fetchData = async (current) => {
    // console.log("Current ID: ", pageState.data[current || 0].id);
    getAdBanner();
  };

  return (
    <div className="banner-container">
      <Slider
        dots={true}
        pauseOnHover={false}
        speed={1000}
        autoplaySpeed={3000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        afterChange={fetchData}
      >
        {pageState.data.map((item) => {
          return (
            <div key={item.id} className="banner-container">
              <img src={item.creatives[0].preview_image} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
