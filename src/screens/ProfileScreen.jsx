import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  // Define userDetails state at the top level
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    image: null,
    location: "",
    phone: "",
  });

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const fetchedUser = await AsyncStorage.getItem("user");
        if (fetchedUser) {
          const userData = JSON.parse(fetchedUser);
          // Set the user data into the state
          setUserDetails({
            name: userData.fullname || "Unavailable",
            username: userData.username || "Unavailable",
            email: userData.email || "Unavailable",
            image: userData.image || null,
            location: userData.location || "Unavailable",
            phone: userData.phone || "Unavailable",
          });
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    FetchUserData();
  }, []);

  console.log(userDetails);

  const handleEditProfile = () => {
    // Navigate to EditProfileScreen with the current user details
    navigation.navigate("EditProfileScreen", { 
      id: userDetails.id, 
      name: userDetails.name, 
      username: userDetails.username, 
      email: userDetails.email, 
      location: userDetails.location, 
      phone: userDetails.phone, 
      image: userDetails.image 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={
            userDetails.image
              ? { uri: userDetails.image }
              : require("../../assets/images/scripture2.jpeg")
          }
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.title}>
            {userDetails.username || userDetails.email}
          </Text>
          <Text style={styles.location}>{userDetails.location}</Text>
        </View>
      </View>

      <View style={styles.PersonalDetailContainer}>
        <Text style={styles.PersonalDetailTitle}>Personal Information</Text>

        <View style={styles.profileItemContainer}>
          <Ionicons name="person-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{userDetails.name}</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <Ionicons name="person-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{userDetails.username}</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <Ionicons name="mail-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userDetails.email}</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{userDetails.location}</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <Ionicons name="call-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userDetails.phone}</Text>
          </View>
        </View>

        <Button title="Edit Profile" onPress={handleEditProfile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_800ExtraBold",
    paddingBottom: 5,
  },
  location: {
    color: "#00A2FF",
    fontFamily: "Nunito_700Bold",
  },
  PersonalDetailContainer: {
    padding: 10,
  },
  PersonalDetailTitle: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
    fontFamily: "Nunito_700Bold",
  },
  profileItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileItem: {
    marginLeft: 15,
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Nunito_500Medium",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Nunito_400Regular",
  },
});

export default ProfileScreen;
