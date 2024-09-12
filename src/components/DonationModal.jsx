import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

const DonationModal = ({
  modalVisible,
  handleAddDonation,
  setModalVisible,
}) => {
  // State to handle selected button
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            width: 50,
            height: 6,
            backgroundColor: "#fff",
            position: "absolute",
            top: "29%",
            borderRadius: 50,
          }}
        ></TouchableOpacity>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How much do you want to donate?</Text>

          <View style={styles.modalButtonContainer}>
            <TextInput
              placeholder="Enter price manually"
              style={styles.input}
            />
            {/* Divider */}

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={[
                styles.modalButton,
                selectedAmount === 50 && styles.selectedButton,
              ]}
              onPress={() => handleAmountSelect(50)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  selectedAmount === 50 && styles.selectedButton,
                ]}
              >
                $50
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                selectedAmount === 100 && styles.selectedButton,
              ]}
              onPress={() => handleAmountSelect(100)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  selectedAmount === 100 && styles.selectedButton,
                ]}
              >
                $100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                selectedAmount === 150 && styles.selectedButton,
              ]}
              onPress={() => handleAmountSelect(150)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  selectedAmount === 150 && styles.selectedButton,
                ]}
              >
                $150
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 250,
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00A2FF",
    paddingVertical: 18,
    borderRadius: 15,
    textAlign: "center",
    width: "90%",
    marginVertical: 10,
    fontFamily: "Nunito_400Regular",
    fontSize: 17,
  },
  modalButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    borderWidth: 1,
    borderColor: "#00A2FF",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: "#80D4FF",
    color: "#fff",
    borderColor: "#fff",
  },
  modalButtonText: {
    color: "#00A2FF",
    fontSize: 15,
    fontFamily: "Nunito_700Bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginVertical: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 15,
    color: "#888", // Lighter color for "or"
    fontFamily: "Nunito_700Bold",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  submitButton: {
    borderWidth: 1,
    borderColor: "#00A2FF",
    backgroundColor: "#00A2FF",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Nunito_700Bold",
  },
});

export default DonationModal;
