import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Helper function to truncate long text
const truncateText = (text, maxLength = 10) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const AppBar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUsername(parsedData.username);
          setEmail(parsedData.email);
          setImage(parsedData.image); // Assuming image is saved in AsyncStorage
        }
      } catch (error) {
        Alert.alert("Failed to fetch user data");
      }
    };

    fetchUserdata();
  }, []);

  // Determine what to display (username or email) and truncate if necessary
  const displayName = truncateText(username || email);

  // Determine image source (from storage or fallback to default)
  const imageSource = image
    ? { uri: image } // Use image from AsyncStorage if available
    : require("../../assets/images/scripture2.jpeg"); // Fallback to default image

  return (
    <SafeAreaView style={styles.topSection}>
      <Text style={styles.welcomeText}>Welcome, {displayName}</Text>
      <View style={styles.userInfo}>
        <Ionicons name="notifications-outline" size={22} color="#333" />
        <Image source={imageSource} style={styles.profileImage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16, // Add some padding for spacing
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Nunito_800ExtraBold",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15, // Make sure it's circular
    marginLeft: 10,
  },
});

export default AppBar;
