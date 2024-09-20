import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchAnnouncement } from "../utils/announcement_api";

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // Selected announcement for modal

  const truncateText = (text, maxLength = 35) => {
    return text?.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const fetchAnnouncementFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetchAnnouncement();
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncementFromAPI();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAnnouncementFromAPI();
    setRefreshing(false);
  };

  // Open modal and set selected announcement
  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedAnnouncement(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.announcementItem}
              onPress={() => openModal(item)} // Open modal on press
            >
              <View style={styles.iconBox}>
                <Ionicons name="megaphone" size={20} color="#fff" />
              </View>
              <View style={styles.announcementsDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.description}>
                  {truncateText(item.content)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Modal for showing announcement details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Announcement Details</Text>
            <Text style={styles.modalContent}>
              {selectedAnnouncement?.content}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Nunito_800ExtraBold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
  iconBox: {
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: "#00A2FF",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  announcementItem: {
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  announcementsDetails: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Nunito_500Medium",
  },
  description: {
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
  },
  // Modal styles
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
    fontFamily: "Nunito_500Medium",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#00A2FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
});

export default AnnouncementsScreen;
