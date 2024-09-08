// /components/LoaderScreen.js
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const LoaderScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = false; // Replace this with actual token check logic
      if (token) {
        // Navigate to Main screen after 2 seconds
        setTimeout(() => {
          navigation.navigate("Main");
        }, 2000);
      } else {
        // Navigate to LoginScreen after 5 seconds
        setTimeout(() => {
          navigation.navigate("IntroScreen");
        }, 5000);
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../../assets/images/loaderimg1.jpg")} // Replace with your image URL or local path
      style={styles.background}
    >
      <View style={styles.container}></View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© ChurchApp 2024</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default LoaderScreen;
