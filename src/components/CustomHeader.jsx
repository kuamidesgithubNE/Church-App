import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title, onEditPress }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onEditPress}>
        <Ionicons name="create-outline" size={24} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 40,
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomHeader;
