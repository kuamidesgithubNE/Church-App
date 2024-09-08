import axios from "axios";

const API_URL = "http://192.168.49.109/churchApp/authentication.php"; // Replace with your actual server URL and API path

// Register user
export const register = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "register",
        email,
        password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "login",
        email,
        password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Update user profile
export const update = async (id, name, username, email, location, phone, image) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "update_profile",
        id,
        name,
        username,
        email,
        location,
        phone,
        image
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
