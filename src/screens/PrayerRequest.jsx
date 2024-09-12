import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PostForm from "../components/PostForm";

const PrayerRequestsScreen = () => {
  const [prayerRequests, setPrayerRequests] = useState([]);

  // Function to add a new prayer request with username and date
  const addPrayerRequest = (username, content) => {
    const newPrayerRequest = {
      username,
      content,
      date: new Date().toLocaleString(), // Add current date
    };
    setPrayerRequests([...prayerRequests, newPrayerRequest]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prayer Requests</Text>

      {/* Prayer Requests List */}
      <FlatList
        data={prayerRequests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No prayer requests available</Text>}
      />

      {/* PostForm for adding new prayer requests */}
      <PostForm onSubmit={addPrayerRequest} />
    </View>
  );
};

export default PrayerRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    fontSize: 14,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});
