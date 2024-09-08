import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { update } from "../utils/api";
import ImageUploadModal from "./UploadModal";

const EditProfileScreen = ({ route, navigation }) => {
  // Destructure the received parameters
  const { id, name, username, email, location, phone, image } = route.params;
  console.log(email);

  const [profileImage, setProfileImage] = useState(image);
  const [isModalVisible, setModalVisible] = useState(false);

  // State to handle updates
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedPhone, setUpdatedPhone] = useState(phone);

  // Sync state with route.params if they change
  useEffect(() => {
    setUpdatedName(name);
    setUpdatedUsername(username);
    setUpdatedEmail(email);
    setUpdatedLocation(location);
    setUpdatedPhone(phone);
    setProfileImage(image);
  }, [name, username, email, location, phone, image]);

  const handleSave = async () => {
    try {
      const result = await update(
        id,
        updatedName,
        updatedUsername,
        updatedEmail,
        updatedLocation,
        updatedPhone,
        profileImage
      );
      if (result.success) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "Unable to update profile. Please try again later.");
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access your gallery is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      closeModal();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera is required!"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/images/scripture2.jpeg")
          }
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <TouchableOpacity onPress={openModal} style={styles.editPicButton}>
            <Ionicons name="camera-outline" size={20} />
            <Text style={styles.editPicButtonText}>Change Profile Pic</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={updatedName}
          onChangeText={setUpdatedName}
        />

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={updatedUsername}
          onChangeText={setUpdatedUsername}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={updatedEmail}
          onChangeText={setUpdatedEmail}
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={updatedLocation}
          onChangeText={setUpdatedLocation}
        />

        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          value={updatedPhone}
          onChangeText={setUpdatedPhone}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <ImageUploadModal
        takePhoto={takePhoto}
        onClose={closeModal}
        pickImageFromGallery={pickImageFromGallery}
        visible={isModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileDetails: {
    marginLeft: 15,
  },
  editPicButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 50,
  },
  editPicButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  button: {
    height: 40,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00A2FF",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito_700Bold",
  },
});

export default EditProfileScreen;
