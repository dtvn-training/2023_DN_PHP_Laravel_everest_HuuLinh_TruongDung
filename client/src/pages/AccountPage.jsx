import { useEffect, useState } from "react";
import "../assets/scss/pages/AccountPage.scss";
import Pagination from "../components/Pagination";
import ModalForm from "../components/ModalForm";
import api from "../api/axios";
import { toast } from "react-toastify";
import { createUserFormField, editUserFormField } from "../utils/userForm";

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

const initState = {
  resData: { current_page: "", data: [], first_page_url: "" },
  currentId: "",
};

const AccountPage = () => {
  const [pageState, setPageState] = useState(initState);
  const [createformVisible, setCreateFormVisible] = useState(false);
  const [editformVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearchChange = async (e) => {};

  const handleChange = (name, value) => {
    setPageState({
      ...pageState,
      [name]: value,
    });
  };

  const handleOpenEditForm = (data) => {
    handleChange("currentId", data.id);
    editUserFormField[0].contents = editUserFormField[0].contents.map(
      (content) => {
        if (data.hasOwnProperty(content.name)) {
          return { ...content, default: data[content.name] };
        }
        return content;
      }
    );
    setEditFormVisible(true);
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("api/user/get");
      handleChange("resData", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = async (data) => {
    if (data.password === data.confirm_password) {
      try {
        const res = await api.post("api/user/create", data);
        toast.success(res.data.message);
        setCreateFormVisible(false);
        fetchUser();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Confirm password does not match");
    }
  };

  const handleEditAccount = async (data) => {
    try {
      const res = await api.post(
        `api/user/update/${pageState.currentId}`,
        data
      );
      toast.success(res.data.message);
      setEditFormVisible(false);
      fetchUser();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="account-page-container">
      <ModalForm
        setVisible={setCreateFormVisible}
        visible={createformVisible}
        title={"Create Account"}
        customFunction={handleCreateAccount}
        formField={createUserFormField}
      />
      <ModalForm
        setVisible={setEditFormVisible}
        visible={editformVisible}
        title={"Edit Account"}
        customFunction={handleEditAccount}
        formField={editUserFormField}
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
          <button type="button" onClick={() => setCreateFormVisible(true)}>
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
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => handleOpenEditForm(user)}
                  >
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
