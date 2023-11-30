import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ModalForm from "../components/ModalForm";
import api from "../api/axios";
import { toast } from "react-toastify";
import { createUserFormField, editUserFormField } from "../utils/userForm";
import DeleteModal from "../components/DeleteModal";
import DownloadCSVButton from "../components/DownLoadCSVButton";
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
  currentUser: {},
  current_page: 1,
};

const AccountPage = () => {
  const [pageState, setPageState] = useState(initState);
  const [formState, setFormState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [pageState.current_page]);

  const handleSearchChange = async (e) => {
    try {
      const res = await api.get(`api/user/get?search_email=${e.target.value}`);
      handleChange("resData", res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleCloseForm = (name) => {
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
      const res = await api.get(`api/user/get?page=${pageState.current_page}`);
      handleChange("resData", res.data[0]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/')
        toast.error(error.response.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleCreateAccount = async (data) => {
    if (data.password === data.confirm_password) {
      try {
        const res = await api.post("api/user/create", data);
        toast.success(res.data.message);
        handleCloseForm("create");
        fetchUser();
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Confirm password does not match");
    }
  };

  const handleEditAccount = async (data) => {
    if (data.email === pageState.currentUser.email) {
      delete data.email;
    }
    try {
      const res = await api.post(
        `api/user/update/${pageState.currentUser.id}`,
        data
      );
      toast.success(res.data.message);
      handleCloseForm("edit");
      fetchUser();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await api.get(`api/user/delete/${pageState.currentUser.id}`);
      toast.success(res.data.message);
      handleCloseForm("delete");
      fetchUser();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="page-container">
        <ModalForm
          setVisible={() => handleCloseForm("create")}
          visible={formState.create}
          title={"Create Account"}
          customFunction={handleCreateAccount}
          formField={createUserFormField}
        />
        <ModalForm
          setVisible={() => handleCloseForm("edit")}
          visible={formState.edit}
          title={"Edit Account"}
          customFunction={handleEditAccount}
          formField={editUserFormField}
          defaultFormValue={pageState.currentUser}
        />
        <DeleteModal
          setVisible={() => handleCloseForm("delete")}
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
            <DownloadCSVButton />
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
            {pageState.resData.data.map((user, index) => {
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
        <Pagination
          totalPages={pageState.resData.last_page}
          setPage={handleChange}
        />
      </div>
    </>
  );
};

export default AccountPage;
