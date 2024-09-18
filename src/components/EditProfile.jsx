import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { update } from "../utils/api"; // Assuming this API handles the backend call
import ImageUploadModal from "./UploadModal";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const EditProfileScreen = ({ route, navigation }) => {
  const { id, name, username, email, location, phone, image, date } =
    route.params;

  const [profileImage, setProfileImage] = useState(image);
  const [isModalVisible, setModalVisible] = useState(false);

  // State to handle form updates
  const [updatedID, setUpdatedID] = useState(id);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date() // Fallback to the current date if date is missing
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setUpdatedID(id);
    setUpdatedName(name);
    setUpdatedUsername(username);
    setUpdatedEmail(email);
    setUpdatedLocation(location);
    setUpdatedPhone(phone);
    setProfileImage(image);
    setSelectedDate(date ? new Date(date) : new Date());
  }, [name, username, email, location, phone, image, date]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSave = async () => {
    try {
      const result = await update(
        updatedID,
        updatedName,
        updatedUsername,
        updatedEmail,
        updatedLocation,
        updatedPhone,
        profileImage,
        selectedDate.toISOString()
      );
      if (result.success) {
        // Store updated profile data in AsyncStorage
        const updatedProfile = {
          id: updatedID,
          name: updatedName,
          username: updatedUsername,
          email: updatedEmail,
          location: updatedLocation,
          phone: updatedPhone,
          image: profileImage,
          date: selectedDate.toISOString(),
        };
        await AsyncStorage.setItem(
          "userProfile",
          JSON.stringify(updatedProfile)
        );
        console.log("UserProfile: ", updatedProfile);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <TouchableOpacity
                onPress={openModal}
                style={styles.editPicButton}
              >
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

            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
              <Ionicons name="calendar-outline" size={20} color="#000" />
              <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
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
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    paddingVertical: 10,
    borderRadius: 30,
  },
  dateText: {
    marginLeft: 10,
    color: "#000",
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

export default EditProfileScreen;
