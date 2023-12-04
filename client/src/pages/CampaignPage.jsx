import { useState } from "react";
import DownloadCSVButton from "../components/DownLoadCSVButton";
import ModalForm from "../components/ModalForm";
import {
  createCampaignFormField,
  editCampaignFormField,
} from "../utils/campaignForm";
import "../assets/scss/pages/CampainPage.scss";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";

const initState = {
  resData: {
    current_page: 1,
    data: [
      {
        id: 1,
        name: "Quảng cáo 1",
        status: 1,
        used_amount: 10,
        usage_rate: 0.5,
        budget: 100,
        bid_amount: 100000,
        start_date: "2023-11-20 02:06:38",
        end_date: "2023-11-20 02:06:38",
        user_updated: 1,
        delete_flag: 0,
        created_at: null,
        updated_at: null,
        creatives: [
          {
            id: 1,
            name: "Vinamilk",
            description: "abc",
            creative_preview:
              "https://th.bing.com/th/id/OIP.6hyCkhXzTvdas0w1VidsjwHaKe?w=203&h=287&c=7&r=0&o=5&pid=1.7",
            final_url:
              "https://th.bing.com/th/id/OIP.6hyCkhXzTvdas0w1VidsjwHaKe?w=203&h=287&c=7&r=0&o=5&pid=1.7",
            id_campaign: 1,
            created_at: null,
            updated_at: null,
          },
        ],
      },
      {
        id: 2,
        name: "Quảng cáo 2",
        status: 0,
        used_amount: 10,
        usage_rate: 0.5,
        budget: 100,
        bid_amount: 90000,
        start_date: "2023-11-20 02:06:38",
        end_date: "2023-11-20 02:06:38",
        user_updated: 1,
        delete_flag: 0,
        created_at: null,
        updated_at: null,
        creatives: [
          {
            id: 2,
            name: "Cake",
            description: "abcde",
            creative_preview:
              "https://automonkey.co/wp-content/uploads/2021/08/informing-about-products-through-ads.jpeg",
            final_url:
              "https://automonkey.co/wp-content/uploads/2021/08/informing-about-products-through-ads.jpeg",
            id_campaign: 2,
            created_at: null,
            updated_at: null,
          },
        ],
      },
    ],
    first_page_url: "http://127.0.0.1:8000/api/user/getCampaign?page=1",
    from: 1,
    last_page: 1,
    last_page_url: "http://127.0.0.1:8000/api/user/getCampaign?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://127.0.0.1:8000/api/user/getCampaign?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: null,
    path: "http://127.0.0.1:8000/api/user/getCampaign",
    per_page: 5,
    prev_page_url: null,
    to: 2,
    total: 2,
  },
  currentCampaign: {},
  localEditCampaignFormField: [...editCampaignFormField],
};

const CampaignPage = () => {
  const [pageState, setPageState] = useState(initState);
  const [formState, setFormState] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const handleChange = (name, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenForm = (name) => {
    setFormState({ ...formState, [name]: true });
  };

  const handleCloseForm = (name) => {
    setFormState({ ...formState, [name]: false });
  };

  const handleOpenEditForm = (data) => {
    handleChange("currentCampaign", data);
    handleChange(
      "localEditCampaignFormField",
      pageState.localEditCampaignFormField.map((group) => {
        if (group.section_title === "Creative") {
          return {
            ...group,
            contents: group.contents.map((content) => {
              if (content.name in data.creatives[0]) {
                return { ...content, default: data.creatives[0][content.name] };
              }
              return content;
            }),
          };
        } else {
          return {
            ...group,
            contents: group.contents.map((content) => {
              if (content.name in data) {
                return { ...content, default: data[content.name] };
              }
              return content;
            }),
          };
        }
      })
    );
    handleOpenForm("edit");
  };

  const handleSearchChange = async (e) => {};

  const handleCreateCampaign = async () => {};

  const handleEditCampaign = async () => {};

  const handleDeleteCampaign = async () => {};

  return (
    <div className="page-container">
      <ModalForm
        setVisible={() => handleCloseForm("create")}
        visible={formState.create}
        title={"Create Campaign"}
        customFunction={handleCreateCampaign}
        formField={createCampaignFormField}
      />
      <ModalForm
        setVisible={() => handleCloseForm("edit")}
        visible={formState.edit}
        title={"Edit Campaign"}
        customFunction={handleEditCampaign}
        formField={pageState.localEditCampaignFormField}
        defaultFormValue={pageState.currentCampaign}
      />
      <DeleteModal
        setVisible={() => handleCloseForm("delete")}
        visible={formState.delete}
        title={"Confirmation"}
        customFunction={handleDeleteCampaign}
        message={"Please confirm that you want to delete the campaign"}
      />
      <div className="filter-bar">
        <label>Start time:</label>
        <input type="datetime-local" name="start_date" />
        <label>End time:</label>
        <input type="datetime-local" name="end_date" />
      </div>
      <div className="control-bar">
        <div className="left-control">
          <input
            type="text"
            placeholder="Search ..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="right-control">
          <DownloadCSVButton />
          <button type="button" onClick={() => handleOpenForm("create")}>
            Create Campaign
          </button>
        </div>
      </div>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageState.resData.data.map((campaign, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="double-item-cell">
                    <div className="img-container">
                      <img src={campaign.creatives[0].creative_preview} alt="" />
                    </div>
                    {campaign.name}
                  </div>
                </td>
                <td>
                  {campaign.status === 1 ? (
                    <i
                      className="fa-solid fa-circle-dot fa-2xs"
                      style={{ color: "greenyellow" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-circle-dot fa-2xs"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>¥ {campaign.used_amount}</td>
                <td>{campaign.usage_rate}%</td>
                <td>¥ {campaign.budget}</td>
                <td>{campaign.start_date}</td>
                <td>{campaign.end_date}</td>
                <td className="no-wrap">
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => handleOpenEditForm(campaign)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => handleOpenForm("delete")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalPages={3} />
    </div>
  );
};

export default CampaignPage;
