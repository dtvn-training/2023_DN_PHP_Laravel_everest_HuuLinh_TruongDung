import React, { useState } from "react";

import axios from "../api/axios";
import { validateRegisterForm } from "../validators";

import "../assets/scss/pages/RegisterPage.scss";
import api from "../api/axios";

const initState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
}

const RegisterPage = () => {
  const [info, setInfo] = useState(initState);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password, password_confirmation } = info
    const { nameError, emailError, passwordError, passwordConfirmError } = validateRegisterForm(name, email, password, password_confirmation);

    if (nameError === "" && emailError === "" && passwordError === "" && passwordConfirmError === "") {
      setError("")
      try {
        const res = await api.post("/api/auth/register", { name, email, password, password_confirmation });

        // Check if the response contains an "email" error
        if (res.data.email && res.data.email.length > 0) {
          setError(res.data.email[0]);
          setSuccess("");
        } else if (res.data.message) {
          // Registration success
          setInfo(initState)
          setSuccess(res.data.message);
        }
      } catch (e) {
        if (e.response.status === 422) {
          if (e.response.data.email) {

            setError(e.response.data.email[0])
          }
          else if (e.response.data.password) {

            setError(e.response.data.password[0])
          }
        }
        else {
          console.error(e);
        }
        setIsLoading(false);

      }
    } else {
      setError(nameError || emailError || passwordError || passwordConfirmError);
    }
    setIsLoading(false);
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h1>REGISTER</h1>
      <input
        value={info.name}
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        value={info.email}
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        value={info.password}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <input
        value={info.password_confirmation}
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      {error && <p className="error-alert">{error}</p>}
      {success && <p className="success-alert">{success}</p>}

      <button className="register-btn green" type="submit" disabled={isLoading}>
        {!isLoading ? "Register" : "Loading"}
      </button>
      <div className="register-option">
        <button className="blue" type="button">
          Facebook
        </button>
        <button className="red" type="button">
          Google
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;