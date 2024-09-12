import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { addTestimony } from "../utils/testimony_api";
import Ionicons from "react-native-vector-icons/Ionicons";

const PostForm = ({ onSubmit }) => {
  const [user_id, setUserID] = useState("");
  const [content, setContent] = useState("");

  // Fetching the username from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchUser = await AsyncStorage.getItem("user");
        if (fetchUser) {
          const userData = JSON.parse(fetchUser);
          setUserID(userData.user_id); // Set the username state
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUserData(); // Call the function to fetch data
  }, []);

  // Handles the submission of the form
  const handleSubmit = () => {
    if (user_id && content) {
      onSubmit(user_id, content); // Pass the username and content to the parent function
      setContent(""); // Clear the content field after submission
    } else {
      alert("Please enter your testimony.");
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Enter your testimony or prayer request"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity
        title="Submit"
        style={styles.sendBtn}
        onPress={handleSubmit}
      >
        <Ionicons name="send-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00A2FF",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    width: "84%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sendBtn: {
    padding: 15,
    backgroundColor: "#00A2FF",
    color: "#fff",
    borderRadius: 30,
  },
});
