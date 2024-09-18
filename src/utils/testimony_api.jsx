import axios from "axios";

const API_URL = "http://192.168.49.109/churchApp/testimony.php"; // Replace with your actual server URL and API path

export const fetchTestimony = async () => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "fetch",
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

export const addTestimony = async (user_id, content) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "create",
        user_id,
        content,
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


export const deleteTestimony = async ({ user_id }) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        action: "fetch",
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
