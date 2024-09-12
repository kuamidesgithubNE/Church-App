import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content) {
      onSubmit(content);
      setContent("");
    } else {
      alert("Please enter content.");
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
