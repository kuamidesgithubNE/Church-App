import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import DonationModal from "./DonationModal";

const DonationDetails = ({ route }) => {
  const { donation } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  // Handle adding a new donation
  const handleAddDonation = (newDonation) => {
    console.log("New Donation Added: ", newDonation);
    setModalVisible(false);
    // Add your logic for adding donation to the data
  };

  // Calculate the progress as a percentage
  const progress = Math.min((donation.raised / donation.goal) * 100, 100);

  // Generate placeholder participants based on the participants count
  const visibleParticipants = Array(Math.min(donation.participants, 3)).fill(
    require("../../assets/images/scripture2.jpeg") // Placeholder image
  );
  const extraParticipants = donation.participants - 3;

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={donation.image} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainerContent}>
          <Text style={styles.title}>{donation.title}</Text>
        </View>

        <View style={styles.detailsContainerContent}>
          <Text style={styles.subtitle}>Donation goals</Text>
          <View style={styles.progressWrapper}>
            <View style={styles.progressContainer}>
              <Text style={styles.raisedText}>
                Raised: ${donation.raised} / ${donation.goal}
              </Text>

              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
            </View>

            <View style={styles.daysLeftContainer}>
              <Text style={styles.daysLeftText}>
                {donation.daysLeft} days left
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainerContent}>
          <Text style={styles.subtitle}>Participants</Text>
          <View style={styles.participantsWrapper}>
            <View style={styles.participantsContainer}>
              {visibleParticipants.map((participantImage, index) => (
                <View key={index} style={styles.participantProfileWrapper}>
                  <Image
                    source={participantImage}
                    style={styles.participantProfile}
                  />
                </View>
              ))}
              {extraParticipants > 0 && (
                <View style={styles.extraParticipantsWrapper}>
                  <Text style={styles.extraParticipantsText}>
                    +{extraParticipants}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>

      {/* Pass modal visibility and handlers to DonationModal */}
      <DonationModal
        modalVisible={modalVisible}
        handleAddDonation={handleAddDonation}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  imageBox: {
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 35,
    marginVertical: 10,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  detailsContainerContent: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 5,
  },
  raisedText: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "Nunito_700Bold",
    color: "#500",
  },
  progressWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressContainer: {
    width: "75%",
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00A2FF",
    borderRadius: 10,
  },
  daysLeftContainer: {
    width: "20%",
    alignItems: "flex-end",
    marginTop: 25,
  },
  daysLeftText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Nunito_400Regular",
  },
  participantsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantProfileWrapper: {
    marginRight: 10,
  },
  participantProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  extraParticipantsWrapper: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  extraParticipantsText: {
    fontSize: 14,
    color: "#555",
  },
  donateButton: {
    backgroundColor: "#00A2FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
});

export default DonationDetails;
