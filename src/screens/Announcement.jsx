// /components/AnnouncementsScreen.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AnnouncementsScreen = () => {
  const truncateText = (text, maxLength = 35) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const announcements = [
    {
      id: "1",
      title: "Church Picnic",
      date: "2024-09-10",
      description: "Join us for a fun day at the park...",
    },
    {
      id: "2",
      title: "Prayer Meeting",
      date: "2024-09-12",
      description: "We will gather for our monthly prayer meeting...",
    },
    // Add more announcements as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.announcementItem}>
            <View style={styles.IconBox}>
              <Ionicons name="megaphone" size={20} color="#fff" />
            </View>
            <View style={styles.announcementsDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.description}>
                {truncateText(item.description)}
              </Text>
            </View>
          </View>
        )}
      />
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
