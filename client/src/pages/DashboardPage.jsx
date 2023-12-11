import { useEffect, useState } from "react";
import api from "../api/axios";
import Pagination from "../components/Pagination";

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
};

const DashboardPage = () => {
  const [pageState, setPageState] = useState(initState);

  useEffect(() => {
    fetchCampaign();
  }, [pageState.current_page]);

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

  const handleChange = (name, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = async (e) => {};

  return (
    <>
      <div className="page-container">
        <div className="control-bar">
          <div className="left-control">
            <input
              type="text"
              placeholder="Search ..."
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-bar">
            <div className="date-input-field">
              <label>Start time:</label>
              <input type="datetime-local" name="start_date" />
            </div>
            <div className="date-input-field">
              <label>End time:</label>
              <input type="datetime-local" name="end_date" />
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
              {pageState.resData.data.map((campaign, index) => {
                return (
                  <tr key={index}>
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
    </>
  );
};

export default DashboardPage;
