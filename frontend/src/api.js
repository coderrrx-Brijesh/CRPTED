import axios from "axios";

// Create an axios instance for backend API calls (with credentials)
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// Create a separate instance for external APIs (without credentials)
const externalApi = axios.create({
  withCredentials: false,
});

export { api, externalApi };
