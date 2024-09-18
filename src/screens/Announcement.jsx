import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchAnnouncement } from "../utils/announcement_api";

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncateText = (text, maxLength = 35) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // Fetch announcement from the backend
  const fetchAnnouncementFromAPI = async () => {
    try {
      setLoading(true); // Show loading indicator while fetching data
      const response = await fetchAnnouncement();
      setAnnouncements(response.data); // Assuming response.data contains the announcement data
      setLoading(false); // Hide loading indicator after data is fetched
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncementFromAPI(); // Fetch announcements when component loads
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id.toString()} // Make sure ID is a string
          renderItem={({ item }) => (
            <View style={styles.announcementItem}>
              <View style={styles.IconBox}>
                <Ionicons name="megaphone" size={20} color="#fff" />
              </View>
              <View style={styles.announcementsDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.description}>
                  {truncateText(item.content)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
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
  IconBox: {
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
});

export default AnnouncementsScreen;
