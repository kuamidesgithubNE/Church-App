import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Linking, // Import Linking for external URL handling
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const OfferingScreen = () => {
  const [titheAmount, setTitheAmount] = useState("");
  const [offeringAmount, setOfferingAmount] = useState("");

  const initializePayment = async (amount, email) => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100, // Convert to kobo
        },
        {
          headers: {
            Authorization: `Bearer sk_test_2d886743b20a9e5b38664b44b2ea6875d06e54d6`, // Replace with your actual Paystack secret key
          },
        }
      );

      const authorizationUrl = response.data.data.authorization_url;

      Alert.alert(
        "Payment Success",
        "Your Payment was successful you will be directed for confirmation"
      );

      // Use Linking to open the URL in the browser
      Linking.openURL(authorizationUrl);
    } catch (error) {
      console.error("Payment initialization error:", error);
      Alert.alert("Error", "Failed to initialize payment.");
    }
  };

  const handleSubmit = () => {
    if (titheAmount || offeringAmount) {
      // Calculate the total amount, ensure values are parsed as numbers
      const totalAmount =
        parseFloat(titheAmount) || 0 + parseFloat(offeringAmount) || 0;

      if (isNaN(totalAmount) || totalAmount <= 0) {
        Alert.alert("Error", "Please enter valid numeric amounts.");
        return;
      }

      const userEmail = "nuboreric6@gmail.com"; // Replace with actual user email input

      // Initialize payment
      initializePayment(totalAmount, userEmail);

      // Clear input fields after submission
      setTitheAmount("");
      setOfferingAmount("");
    } else {
      Alert.alert("Error", "Please enter an amount for tithe or offering.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offering Quote:</Text>
      <Text style={styles.scripture}>
        "Bring all the tithes into the storehouse, that there may be food in My
        house. And try Me now in this," says the Lord of hosts, "If I will not
        open for you the windows of heaven and pour out for you such blessing
        that there will not be room enough to receive it." – Malachi 3:10
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Tithe Amount"
        value={titheAmount}
        onChangeText={setTitheAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Offering Amount"
        value={offeringAmount}
        onChangeText={setOfferingAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="send-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfferingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 10,
    color: "#555",
  },
  scripture: {
    fontSize: 16,
    color: "#00A2FF",
    marginBottom: 40,
    fontFamily: "Nunito_700Bold_Italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00A2FF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00A2FF",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
});
