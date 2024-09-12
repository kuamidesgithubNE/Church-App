import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PostForm from "../components/PostForm";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import axios from "axios";

const TestimoniesScreen = () => {
  const [testimonies, setTestimonies] = useState([]);

  // Fetch testimonies from the backend
  const fetchTestimonies = async () => {
    try {
      const response = await axios.get(
        "https://your-backend-url.com/api/getTestimonies.php"
      );
      setTestimonies(response.data);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const toggleFavorite = (index) => {
    const updatedTestimonies = testimonies.map((item, i) =>
      i === index ? { ...item, favorited: !item.favorited } : item
    );
    setTestimonies(updatedTestimonies);
  };

  const likeTestimony = (index) => {
    const updatedTestimonies = testimonies.map((item, i) =>
      i === index ? { ...item, likes: item.likes + 1 } : item
    );
    setTestimonies(updatedTestimonies);
  };

  const addTestimony = async (username, content) => {
    const newTestimony = {
      username,
      content,
      date: new Date().toLocaleString(),
      likes: 0, // Default likes
      favorited: false, // Default favorited state
    };

    try {
      // Send the testimony to the backend
      const response = await axios.post(
        "https://your-backend-url.com/api/addTestimony.php",
        newTestimony
      );

      if (response.data.success) {
        // Update the testimonies state with the new testimony after successful submission
        setTestimonies([...testimonies, newTestimony]);
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
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.actionsContainer}>
        {/* Like Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => likeTestimony(index)}
        >
          <Ionicons name="thumbs-up-outline" size={18} color="#4CAF50" />
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
            color={item.favorited ? "red" : "#4CAF50"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="chatbubbles-outline" size={30} color="#4CAF50" />
        <Text style={styles.title}>Testimonies</Text>
      </View>

      <FlatList
        data={testimonies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
            }}
          >
            No testimonies available
          </Text>
        }
      />

      <PostForm onSubmit={addTestimony} />
    </View>
  );
};

export default TestimoniesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Nunito_700Bold",
  },
  content: {
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
    color: "#555",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
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
