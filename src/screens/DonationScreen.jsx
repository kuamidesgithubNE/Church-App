import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const donations = [
  {
    id: 1,
    title: "Help the Indonesian kids for better education",
    image: require("../../assets/images/background2.jpg"),
    participants: 12,
    goal: "5000",
    raised: "3500",
    daysLeft: 30,
  },
  {
    id: 2,
    title: "Support Disaster Relief in Haiti",
    image: require("../../assets/images/background3.jpg"),
    participants: 9,
    goal: "10000",
    raised: "7000",
    daysLeft: 15,
  },
  // Add more donations as needed
];

const DonationScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.title}>Start New Fundraising</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("Offering")}
        >
          <Text style={styles.startButtonText}>Start Now</Text>
        </TouchableOpacity>
      </View>

      {donations.map((donation) => (
        <View key={donation.id} style={styles.cardContainer}>
          <ImageBackground source={donation.image} style={styles.cardImage}>
            <View style={styles.overlay} />
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text
                  style={styles.cardTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {donation.title}
                </Text>
                <Text style={styles.cardParticipants}>
                  {donation.participants} Participants
                </Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() =>
                  navigation.navigate("DonationDetails", { donation })
                }
              >
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  message: {
    backgroundColor: "#00A2FF",
    flexDirection: "row",
    padding: 30,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "#00A2FF",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardContainer: {
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 20,
    elevation: 6, // Adjust if needed
  },
  cardImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  cardContent: {
    width: 300, // Fixed width for content
    alignSelf: "center",
    padding: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
    width: "80%",
  },
  cardParticipants: {
    color: "#888",
  },
  detailsButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
});

export default DonationScreen;
