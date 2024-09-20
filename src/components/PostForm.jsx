import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PostForm = ({ onSubmit, onSuccess, type }) => {
  const [user_id, setUserID] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchUser = await AsyncStorage.getItem("user");
        if (fetchUser) {
          const userData = JSON.parse(fetchUser);
          setUserID(userData.user_id);
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    if (user_id && content) {
      try {
        const success = await onSubmit(user_id, content, type);
        if (success) {
          setContent(""); // Clear the content field after submission
          if (onSuccess) {
            onSuccess(); // Call the onSuccess callback
          }
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please enter your content.");
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={`Enter your ${type === 'testimony' ? 'testimony' : 'prayer request'}`}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
        <Ionicons name="send-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  form: {
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
    backgroundColor: "#fff",
  },
  sendBtn: {
    padding: 15,
    backgroundColor: "#00A2FF",
    borderRadius: 30,
  },
});
