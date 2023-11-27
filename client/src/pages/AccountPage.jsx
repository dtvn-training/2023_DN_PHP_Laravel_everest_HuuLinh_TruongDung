import { useState } from "react";
import "../assets/scss/pages/AccountPage.scss";
import Pagination from "../components/Pagination";
import ModalForm from "../components/ModalForm";

const fakeData = [
  {
    id: 1,
    first_name: null,
    email: "admin@gmail.com",
    email_verified_at: null,
    last_name: null,
    image: null,
    role_id: 1,
    address: null,
    phone: null,
    delete_flag: null,
    created_at: "2023-11-20T02:06:38.000000Z",
    updated_at: "2023-11-20T02:06:38.000000Z",
    role: "admin",
  },
  {
    id: 2,
    first_name: null,
    email: "huulinh123@gmail.com",
    email_verified_at: null,
    last_name: null,
    image: null,
    role_id: 1,
    address: null,
    phone: null,
    delete_flag: null,
    created_at: "2023-11-21T08:35:54.000000Z",
    updated_at: "2023-11-21T08:35:54.000000Z",
    role: "admin",
  },
  {
    id: 4,
    first_name: "Nguyễn Hữuuu",
    email: "test@gmail.com",
    email_verified_at: null,
    last_name: "Lĩnhhhh",
    image: null,
    role_id: null,
    address: "Đà Nẵng",
    phone: "099999",
    delete_flag: null,
    created_at: "2023-11-21T09:29:30.000000Z",
    updated_at: "2023-11-21T09:36:55.000000Z",
    role: "DAC",
  },
];

const AccountPage = () => {
  const [formVisible, setFormVisible] = useState(false);

  const handleSearchChange = async (e) => {};

  return (
    <div className="account-page-container">
      <ModalForm
        setVisible={setFormVisible}
        visible={formVisible}
        title={"Create Account"}
        customFunction={() => alert("ok")}
      />
      <div className="control-bar">
        <div className="left-control">
          <input
            type="text"
            placeholder="Search ..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="right-control">
          <button type="button" onClick={() => setFormVisible(true)}>
            Create Account
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name + " " + user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" type="button">
                    Edit
                  </button>
                  <button className="delete-btn" type="button">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalPages={10} />
    </div>
  );
};

export default AccountPage;
