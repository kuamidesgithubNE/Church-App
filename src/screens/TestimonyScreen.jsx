import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import PostForm from "../components/PostForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addTestimony, fetchTestimony } from "../utils/testimony_api";

const TestimoniesScreen = () => {
  const [testimonies, setTestimonies] = useState([]);

  // Fetch testimonies from the backend
  const fetchTestimoniesFromAPI = async () => {
    try {
      const response = await fetchTestimony();
      setTestimonies(response.data);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

  useEffect(() => {
    fetchTestimoniesFromAPI();
  }, []);

  const addTestimonyToAPI = async (user_id, content) => {
    // Define newTestimony without likes and favorited
    console.log(typeof user_id); // Logs the type of the variable

    try {
      // Send the testimony to the backend
      const response = await addTestimony(user_id, content);
      if (response.success) {
        // Update the testimonies state with the new testimony after successful submission
        Alert.alert("Success", "You testimony has been added successfully!");
      } else {
        console.error("Error submitting testimony");
      }
    } catch (error) {
      console.error("Error adding testimony:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.date}>{item.shared_at}</Text>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.actionsContainer}>
        {/* Like Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => likeTestimony(index)}
        >
          <Ionicons name="thumbs-up-outline" size={18} color="#fff" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleFavorite(index)}
        >
          <Ionicons
            name={item.favorited ? "heart" : "heart-outline"}
            size={18}
            color={item.favorited ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="chatbubbles-outline" size={30} color="#00A2FF" />
        <Text style={styles.title}>Testimonies</Text>
      </View>

      <FlatList
        data={testimonies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>No testimonies available</Text>
        }
      />

      <PostForm onSubmit={addTestimonyToAPI} />
    </View>
  );
};

export default TestimoniesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    backgroundColor: "#00A2FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Nunito_700Bold",
  },
  content: {
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
    color: "#eee",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#ddd",
    fontFamily: "Nunito_500Medium",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    fontSize: 14,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
});
