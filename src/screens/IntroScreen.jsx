import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import the icon

const IntroScreen = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate("LoginScreen"); // Navigate to the login screen when "Skip" is pressed
  };

  const handleLogin = () => {
    navigation.navigate("LoginScreen"); // Navigate to the login screen
  };

  const handleSignup = () => {
    navigation.navigate("SignupScreen"); // Navigate to the signup screen
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/background2.jpg")} // Replace with your image URL or local path
        style={styles.background}
      >
        {/* Overlay to improve text visibility */}
        <View style={styles.overlay} />

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}> Skip</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <Swiper loop={false} activeDotColor="#fff">
          <View style={styles.slide}>
            <Text style={styles.title}>Welcome to Our Church</Text>
            <Text style={styles.text}>Join us in our journey of faith.</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Stay Connected</Text>
            <Text style={styles.text}>
              Get updates on events and announcements.
            </Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Give and Serve</Text>
            <Text style={styles.text}>
              Support our mission through donations and service.
            </Text>
          </View>
        </Swiper>

        {/* Login and Signup Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
  },
  skipButton: {
    position: "absolute",
    top: 50, // Adjust the position based on your design
    right: 20,
    padding: 5,
    flexDirection: "row", // Align icon and text in a row
    alignItems: "center",
    zIndex: 10,
    gap: 4,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5, // Add some spacing between the icon and the text
  },
  slide: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 50,
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IntroScreen;
