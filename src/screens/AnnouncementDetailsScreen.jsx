import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// This screen receives the announcement details as route params
const AnnouncementDetailsScreen = ({ route, navigation }) => {
  const { title, date, content, attachments } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.content}>{content}</Text>

      {attachments && attachments.length > 0 ? (
        <View style={styles.attachmentSection}>
          <Text style={styles.attachmentHeader}>Attachments:</Text>
          {attachments.map((attachment, index) => (
            <TouchableOpacity
              key={index}
              style={styles.attachmentItem}
              onPress={() => {
                // Logic for opening attachment (can use Linking or a custom viewer)
                console.log("Opening attachment:", attachment.url);
              }}
            >
              <Ionicons name="document-attach" size={24} color="#00A2FF" />
              <Text style={styles.attachmentName}>{attachment.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noAttachmentText}>No attachments available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    direction: "colomn",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "Nunito_700Bold",
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
    fontFamily: "Nunito_500Medium",
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Nunito_400Regular",
  },
  attachmentSection: {
    marginTop: 16,
  },
  attachmentHeader: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Nunito_700Bold",
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  attachmentName: {
    marginLeft: 8,
    fontSize: 16,
    color: "#00A2FF",
  },
  noAttachmentText: {
    fontSize: 16,
    color: "gray",
    marginTop: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#00A2FF",
    borderRadius: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#fff",
    fontFamily: "Nunito_700Bold",
  },
});

export default AnnouncementDetailsScreen;
