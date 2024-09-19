import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  RefreshControl,
} from "react-native";
import PostForm from "../components/PostForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addTestimony,
  fetchTestimony,
  deleteTestimony,
} from "../utils/testimony_api"; // Assuming you have a deleteTestimony API

const TestimoniesScreen = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [userId, setUserId] = useState(null); // For storing the user's ID
  const [selectedTestimony, setSelectedTestimony] = useState(null); // For storing the selected testimony for edit/delete
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility
  const [refreshing, setRefreshing] = useState(false); // For refresh control

  useFocusEffect(
    React.useCallback(() => {
      fetchTestimoniesFromAPI(); // Fetch data when the screen is focused
      getUserIdFromStorage(); // Get user_id from AsyncStorage
    }, [])
  );

  const getUserIdFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
      setUserId(userData.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Fetch testimonies from the backend
  const fetchTestimoniesFromAPI = async () => {
    try {
      const response = await fetchTestimony();
      setTestimonies(response.data);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

  const addTestimonyToAPI = async (user_id, content) => {
    try {
      const response = await addTestimony(user_id, content);
      if (response.success) {
        Alert.alert("Success", "Your testimony has been added successfully!");
        fetchTestimoniesFromAPI(); // Refresh testimonies
      } else {
        console.error("Error submitting testimony");
      }
    } catch (error) {
      console.error("Error adding testimony:", error);
    }
  };

  const handleLongPress = (items) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === userId) {
        setSelectedTestimony(items[i]); // Set the testimony to be edited or deleted
        setModalVisible(true); // Show modal
        break; // Exit the loop once the matching item is found
      }
    }
  };

  const handleDeleteTestimony = async () => {
    try {
      const response = await deleteTestimony(selectedTestimony.id); // Assuming testimony has an ID
      if (response.success) {
        Alert.alert("Deleted", "Your testimony has been deleted.");
        fetchTestimoniesFromAPI(); // Refresh testimonies after deletion
      } else {
        console.error("Error deleting testimony");
      }
    } catch (error) {
      console.error("Error deleting testimony:", error);
    } finally {
      setModalVisible(false); // Hide modal after action
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTestimoniesFromAPI(); // Refresh the testimonies
    setRefreshing(false); // Stop the spinner after data is fetched
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.date}>{item.shared_at}</Text>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => likeTestimony(index)}
        >
          <Ionicons name="thumbs-up-outline" size={18} color="#fff" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

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
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      nestedScrollEnabled={true}
    >
      <FlatList
        data={testimonies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>No testimonies available</Text>
        }
        nestedScrollEnabled={true}
      />

      <PostForm onSubmit={addTestimonyToAPI} />

      {/* Modal for Edit/Delete */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit or Delete Testimony</Text>
            <Button
              title="Edit"
              onPress={() => {
                /* Implement editing logic here */
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={handleDeleteTestimony}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TestimoniesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#00A2FF",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
});
