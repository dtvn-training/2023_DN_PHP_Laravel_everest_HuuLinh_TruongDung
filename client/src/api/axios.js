import axios from "axios";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  let token = "";
  if (accessToken) {
    token = accessToken.replace(/"/g, "");
  }
  return token;
};

function buildApi() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_URL,
    withCredentials: false,
  });
  instance.interceptors.request.use((config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: false,
  }));

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && 401 === error.response.status) {
        let savedToken = getAccessToken();
        if (savedToken !== null) {
          localStorage.removeItem("accessToken");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

const api = buildApi();
export default api;
