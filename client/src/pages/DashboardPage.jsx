const DashboardPage = () => {
  return (
    <>
      <div className="page-container">
        <div className="control-bar"></div>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
