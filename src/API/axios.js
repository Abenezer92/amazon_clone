import axios from "axios";

const axiosInstance = axios.create({
  // localhost api
  baseURL: "https://amazon-api-deploy-6-2l0z.onrender.com",

  // backend locally using express server on port 5173
  // baseURL: "http://localhost:5173/clone-47b67/api",
});

export { axiosInstance };
