import React, { useState, useCallback } from "react";
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
  addPrayerRequest,
  fetchPrayerRequests,
  deletePrayerRequest,
} from "../utils/prayerrequest_api";

const PrayerRequestsScreen = () => {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchPrayerRequestsFromAPI();
      getUserIdFromStorage();
    }, [])
  );

  const truncateText = (text, maxLength = 35) => {
    return text?.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const getUserIdFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
      setUserId(userData?.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const fetchPrayerRequestsFromAPI = async () => {
    try {
      const response = await fetchPrayerRequests();
      setPrayerRequests(response.data);
    } catch (error) {
      console.error("Error fetching prayer requests:", error);
    }
  };

  const addPrayerRequestToAPI = async (user_id, content) => {
    try {
      const response = await addPrayerRequest(user_id, content);
      if (response.success) {
        Alert.alert(
          "Success",
          "Your prayer request has been added successfully!"
        );
        fetchPrayerRequestsFromAPI();
      } else {
        console.error("Error submitting prayer request");
      }
    } catch (error) {
      console.error("Error adding prayer request:", error);
    }
  };

  const handleLongPress = (request) => {
    if (request.user_id === userId) {
      setSelectedRequest(request);
      setModalVisible(true);
    }
  };

  // Handle short press to view details in modal
  const handlePress = (item) => {
    setSelectedRequest(item);
    setModalVisible(true);
  };

  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    try {
      const response = await deletePrayerRequest(selectedRequest.id);
      if (response.success) {
        Alert.alert("Deleted", "Your prayer request has been deleted.");
        fetchPrayerRequestsFromAPI();
      } else {
        console.error("Error deleting prayer request");
      }
    } catch (error) {
      console.error("Error deleting prayer request:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPrayerRequestsFromAPI();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      onPress={() => handlePress(item)}
      style={styles.card}
    >
      <View style={styles.iconBox}>
        <Ionicons name="help-circle-outline" size={20} color="#fff" />
      </View>
      <View style={styles.details}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.date}>{item.posted_at}</Text>
        <Text style={styles.content}>{truncateText(item.content)}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => likePrayerRequest(item.id)} // Assuming likePrayerRequest is defined elsewhere
          >
            <Ionicons name="thumbs-up-outline" size={18} color="#00A2FF" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleFavorite(item.id)} // Assuming toggleFavorite is defined elsewhere
          >
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
        data={prayerRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No prayer requests available</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <PostForm onSubmit={addPrayerRequestToAPI} type="prayer request" />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Prayer Request Details</Text>
            <Text style={styles.modalContent}>{selectedRequest?.content}</Text>
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

export default PrayerRequestsScreen;

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
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
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
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00A2FF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
});
