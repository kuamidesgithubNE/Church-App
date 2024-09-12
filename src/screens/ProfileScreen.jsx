import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    image: null,
    location: "",
    phone: "",
    date: "",
  });

  const [updatatedUserDetails, setupdatedUserDetails] = useState({
    updatedId: "",
    updatedName: "",
    updatedUsername: "",
    updatedEmail: "",
    updataedImage: null,
    updatedLocation: "",
    updatedPhone: "",
    updatedDate: "",
  });

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const fetchedUser = await AsyncStorage.getItem("user");
        if (fetchedUser) {
          const userData = JSON.parse(fetchedUser);

          // Format the date
          const formattedDate = new Date(userData.dob).toLocaleDateString(); // Format as MM/DD/YYYY or customize further

          // Set the user data into the state
          setUserDetails({
            id: userData.user_id,
            name: userData.fullname,
            username: userData.username,
            email: userData.email,
            image: userData.image || null,
            location: userData.location,
            phone: userData.phone,
            date: formattedDate, // Use formatted date here
          });
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    FetchUserData();
  }, []);

  const getProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem("userProfile");
      if (profileData !== null) {
        // Data is retrieved and can be used
        const userProfile = JSON.parse(profileData);
        setUserDetails({
          id: userProfile.user_id,
          name: userProfile.fullname,
          username: userProfile.username,
          email: userProfile.email,
          image: userProfile.image || null,
          location: userProfile.location,
          phone: userData.phone,
          date: formattedDate, // Use formatted date here
        });
      }
    } catch (error) {
      console.error("Error retrieving profile data: ", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen", {
      id: userDetails.id,
      name: userDetails.name,
      username: userDetails.username,
      email: userDetails.email,
      location: userDetails.location,
      phone: userDetails.phone,
      image: userDetails.image,
      date: userDetails.date,
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

        <View style={styles.profileItemContainer}>
          <Ionicons name="calendar-outline" size={20} color="#000" />
          <View style={styles.profileItem}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{userDetails.date}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
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
    marginVertical: 10,
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
  button: {
    backgroundColor: "#00A2FF",
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProfileScreen;
