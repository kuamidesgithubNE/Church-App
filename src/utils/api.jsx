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
export const update = async (
  id,
  name,
  username,
  email,
  location,
  phone,
  image,
  date
) => {
  try {
    // Log the data before sending the request
    console.log("Updating profile with data:", {
      id,
      name,
      username,
      email,
      location,
      phone,
      image,
      date,
    });
    console.log(
      "Request parameters:",
      new URLSearchParams({
        action: "update_profile",
        id,
        name,
        username,
        email,
        location,
        phone,
        image,
        date,
      }).toString()
    );

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
        image,
        date,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // Log the response received from the server
    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    // Log the error message if the request fails
    console.error("Update profile error:", error);

    throw error;
  }
};
