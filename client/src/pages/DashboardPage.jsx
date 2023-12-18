import { useEffect, useState } from "react";
import api from "../api/axios";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initState = {
  resData: {
    current_page: "",
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: null,
    links: [],
    next_page_url: null,
    path: null,
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0,
  },
  current_page: 1,
  timeoutId: null,
  start_date: null,
  end_date: null,
  search_campaign: null,
};

const DashboardPage = () => {
  const [pageState, setPageState] = useState(initState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await api.get(
          `api/campaign/get?page=${pageState.current_page}`
        );
        handleChange("resData", res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCampaign();
  }, [pageState.current_page]);

  useEffect(() => {
    const handleSearchAndFilter = async () => {
      if (pageState.timeoutId) clearTimeout(pageState.timeoutId);

      handleChange(
        "timeoutId",
        setTimeout(async () => {
          try {
            const res = await api.get(`api/campaign/get`, {
              params: {
                start_date: pageState.start_date,
                end_date: pageState.end_date,
                search_campaign: pageState.search_campaign,
              },
            });
            handleChange("resData", res.data);
          } catch (error) {
            if (error.response && error.response.status === 401) {
              navigate("/");
              toast.error(error.response.data.message);
            } else {
              console.error(error);
            }
          }
        }, 500)
      );
    };
    handleSearchAndFilter();
  }, [pageState.start_date, pageState.end_date, pageState.search_campaign, navigate]);

  const handleChange = (name, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
      <div className="page-container">
        <div className="control-bar">
          <div className="left-control">
            <input
              type="text"
              placeholder="Search ..."
              name="search_campaign"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="filter-bar">
            <div className="date-input-field">
              <label>Start time:</label>
              <input
                type="datetime-local"
                name="start_date"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="date-input-field">
              <label>End time:</label>
              <input
                type="datetime-local"
                name="end_date"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Status</th>
                <th>Used Amount</th>
                <th>Usage Rate</th>
                <th>Budget</th>
                <th>Start date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {pageState.resData.data.map((campaign) => {
                return (
                  <tr key={campaign.id}>
                    <td>
                      <div className="double-item-cell">
                        <div className="img-container">
                          {campaign.creatives.length > 0 && (
                            <img
                              src={campaign.creatives[0].preview_image}
                              alt=""
                            />
                          )}
                        </div>
                        {campaign.campaign_name}
                      </div>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-circle-dot fa-2xs"
                        style={{
                          color: campaign.status == 1 ? "greenyellow" : "red",
                        }}
                      ></i>
                    </td>
                    <td>¥ {campaign.used_amount}</td>
                    <td>{campaign.usage_rate}%</td>
                    <td>¥ {campaign.budget}</td>
                    <td>{campaign.start_date}</td>
                    <td>{campaign.end_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {pageState.resData.last_page > 1 && (
          <Pagination
            totalPages={pageState.resData.last_page}
            setPage={handleChange}
            current_page={pageState.resData.current_page}
          />
        )}
      </div>
  );
};

export default DashboardPage;
