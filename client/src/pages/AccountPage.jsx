import { useEffect, useState } from "react";
import "../assets/scss/pages/AccountPage.scss";
import Pagination from "../components/Pagination";
import ModalForm from "../components/ModalForm";
import api from "../api/axios";
import { toast } from "react-toastify";
import { createUserFormField, editUserFormField } from "../utils/userForm";
import DeleteModal from "../components/DeleteModal";

const fakeData = [
  {
    id: 4,
    first_name: "Nguyễn Hữuuu",
    email: "test@gmail.com",
    email_verified_at: null,
    last_name: "Lĩnhhhh",
    image: null,
    role_id: 1,
    address: "Đà Nẵng",
    phone: "099999",
    delete_flag: null,
    created_at: "2023-11-21T09:29:30.000000Z",
    updated_at: "2023-11-21T09:36:55.000000Z",
  },
  {
    id: 4,
    first_name: "Nguyễn Hữuuu",
    email: "test@gmail.com",
    email_verified_at: null,
    last_name: "Lĩnhhhh",
    image: null,
    role_id: 2,
    address: "Đà Nẵng",
    phone: "099999",
    delete_flag: null,
    created_at: "2023-11-21T09:29:30.000000Z",
    updated_at: "2023-11-21T09:36:55.000000Z",
  },
  {
    id: 4,
    first_name: "Nguyễn Hữuuu",
    email: "test@gmail.com",
    email_verified_at: null,
    last_name: "Lĩnhhhh",
    image: null,
    role_id: 2,
    address: "Đà Nẵng",
    phone: "099999",
    delete_flag: null,
    created_at: "2023-11-21T09:29:30.000000Z",
    updated_at: "2023-11-21T09:36:55.000000Z",
  },
];

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
  currentUser: {},
};

const AccountPage = () => {
  const [pageState, setPageState] = useState(initState);
  const [formState, setFormState] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    // fetchUser();
  }, []);

  const handleSearchChange = async (e) => {};

  const getRole = (role_id) => {
    switch (role_id) {
      case 1:
        return "DAC";
      case 2:
        return "Advertiser";
      case 3:
        return "Admin";
    }
  };

  const handleChange = (name, value) => {
    setPageState({
      ...pageState,
      [name]: value,
    });
  };

  const handleOpenForm = (name) => {
    setFormState({ ...formState, [name]: true });
  };

  const closeOpenForm = (name) => {
    setFormState({ ...formState, [name]: false });
  };

  const handleOpenEditForm = (data) => {
    handleChange("currentUser", data);
    editUserFormField[0].contents = editUserFormField[0].contents.map(
      (content) => {
        if (data.hasOwnProperty(content.name)) {
          return { ...content, default: data[content.name] };
        }
        return content;
      }
    );
    handleOpenForm("edit");
  };

  const handleOpenDeleteForm = (data) => {
    handleChange("currentUser", data);
    handleOpenForm("delete");
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
        handleOpenForm("create");
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
        `api/user/update/${pageState.currentUser.id}`,
        data
      );
      toast.success(res.data.message);
      handleOpenForm("edit");
      fetchUser();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await api.delete(
        `api/user/delete/${pageState.currentUser.id}`
      );
      toast.success(res.data.message);
      handleOpenForm("delete");
      fetchUser();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="account-page-container">
      <ModalForm
        setVisible={() => closeOpenForm("create")}
        visible={formState.create}
        title={"Create Account"}
        customFunction={handleCreateAccount}
        formField={createUserFormField}
      />
      <ModalForm
        setVisible={() => closeOpenForm("edit")}
        visible={formState.edit}
        title={"Edit Account"}
        customFunction={handleEditAccount}
        formField={editUserFormField}
        defaultFormValue={pageState.currentUser}
      />
      <DeleteModal
        setVisible={() => closeOpenForm("delete")}
        visible={formState.delete}
        title={"Delete warning"}
        customFunction={handleDeleteAccount}
        message={"This will delete the account"}
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
          <button type="button" onClick={() => handleOpenForm("create")}>
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
      <Pagination totalPages={pageState.resData.total} />
    </div>
  );
};

export default AccountPage;
