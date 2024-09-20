import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import PostForm from "../components/PostForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addTestimony,
  fetchTestimony,
  deleteTestimony,
} from "../utils/testimony_api";

const TestimoniesScreen = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch testimonies and user ID when screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTestimoniesFromAPI();
      getUserIdFromStorage();
    }, [])
  );

  // Truncate long text for display
  const truncateText = (text, maxLength = 35) => {
    return text?.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Get user ID from AsyncStorage
  const getUserIdFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
      setUserId(userData?.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Fetch testimonies from API
  const fetchTestimoniesFromAPI = async () => {
    try {
      const response = await fetchTestimony();
      setTestimonies(response?.data || []);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

  // Add testimony to API
  const addTestimonyToAPI = async (user_id, content) => {
    try {
      const response = await addTestimony(user_id, content);
      if (response.success) {
        Alert.alert("Success", "Your testimony has been added!");
        fetchTestimoniesFromAPI();
      }
    } catch (error) {
      console.error("Error adding testimony:", error);
    }
  };

  // Handle long press on testimony for actions
  const handleLongPress = (item) => {
    if (item.user_id === userId) {
      setSelectedTestimony(item);
      setModalVisible(true);
    }
  };

  // Handle short press to view details in modal
  const handlePress = (item) => {
    setSelectedTestimony(item);
    setModalVisible(true);
  };

  // Delete selected testimony
  const handleDeleteTestimony = async () => {
    try {
      const response = await deleteTestimony(selectedTestimony.id);
      if (response.success) {
        Alert.alert("Deleted", "Testimony has been deleted.");
        fetchTestimoniesFromAPI();
      }
    } catch (error) {
      console.error("Error deleting testimony:", error);
    } finally {
      setModalVisible(false);
    }
  };

  // Refresh testimonies
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTestimoniesFromAPI();
    setRefreshing(false);
  };

  // Render each testimony item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      onPress={() => handlePress(item)} // Click to view details
      style={styles.card}
    >
      <View style={styles.iconBox}>
        <Ionicons name="chatbubbles-outline" size={20} color="#fff" />
      </View>
      <View style={styles.details}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.date}>{item.shared_at}</Text>
        <Text style={styles.content}>{truncateText(item.content)}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="thumbs-up-outline" size={18} color="#00A2FF" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name={item.favorited ? "heart" : "heart-outline"}
              size={18}
              color={item.favorited ? "red" : "#00A2FF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={testimonies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No testimonies available</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <PostForm onSubmit={addTestimonyToAPI} type="testimony" />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Testimony Details</Text>
            <Text style={styles.modalContent}>
              {selectedTestimony?.content}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  card: {
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  iconBox: {
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: "#00A2FF",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  username: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  date: {
    fontSize: 12,
    color: "#bbb",
    fontFamily: "Nunito_500Medium",
  },
  content: {
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
    marginVertical: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#aaa",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Nunito_500Medium",
  },
  closeButton: {
    backgroundColor: "#00A2FF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
});
