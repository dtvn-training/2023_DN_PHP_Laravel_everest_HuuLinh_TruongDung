import DownloadCSVButton from "../components/DownLoadCSVButton";

const fakeData = [];

const CampaignPage = () => {
  const handleSearchChange = async (e) => {};

  return (
    <div className="page-container">
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
          <button type="button">Create Campaign</button>
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
            <th>Start data</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name + " " + user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{getRole(user.role_id)}</td>
                <td>
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => handleOpenEditForm(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => handleOpenDeleteForm(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignPage;
