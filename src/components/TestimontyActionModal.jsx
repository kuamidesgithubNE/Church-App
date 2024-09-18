// components/ActionModal.js
import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ActionModal = ({ visible, onClose, onEdit, onDelete }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={onEdit}>
            <Ionicons name="pencil" size={20} color="#00A2FF" />
            <Text style={styles.modalText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onDelete}>
            <Ionicons name="trash" size={20} color="#FF0000" />
            <Text style={styles.modalText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#000" />
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  modalText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ActionModal;
