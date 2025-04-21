import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ environment variable
  withCredentials: true,
});

// Signup
export const signup = (userData) => API.post("/user/signup", userData);

// Signin
export const signin = async (userData) => {
  try {
    const response = await API.post("/user/signin", userData);
    return response;
  } catch (error) {
    // console.error("Signin error:", error);
    throw new Error("Signin failed, please try again later.");
  }
};

// Logout
export const logout = () => API.post("/user/logout");
