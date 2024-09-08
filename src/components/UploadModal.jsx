import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const ImageUploadModal = ({
  visible,
  onClose,
  pickImageFromGallery,
  takePhoto,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Upload Image</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={pickImageFromGallery}
          >
            <Ionicons name="image-outline" size={25} color="#00A2FF" />
            <Text style={styles.modalButtonText}>Pick from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={25} color="#00A2FF" />
            <Text style={styles.modalButtonText}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageUploadModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
    justifyContent: "center",
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#00A2FF",
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "red",
  },
});
