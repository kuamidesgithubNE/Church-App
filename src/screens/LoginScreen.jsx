import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../utils/api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);

      if (result.success) {
        Alert.alert("Success", "Login successful!");

        // Accessing and assigning the data from the backend
        const userToken = result.token; // Assuming the API returns a token
        const user = JSON.stringify(result.user);

        console.log("UserToken", userToken);
        console.log("User", user);

        // Storing the user data locally in the Async Function
        await AsyncStorage.setItem("userToken", userToken); // Store token
        await AsyncStorage.setItem("user", user);

        // Navigate to home or another screen
        navigation.replace("Main");
      } else {
        Alert.alert("Error", result.message || "Login failed!");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.background}
    >
      <Text style={styles.logo}>DigiChurch</Text>

      <View style={styles.loginBox}>
        <Text style={styles.header}>Welcome Back</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupLink}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>© DigiChurch 2024</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 40,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  loginBox: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  header: {
    fontSize: 28,
    color: "#333",
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(230, 230, 230, 0.8)",
    borderRadius: 50,
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  icon: {
    color: "#333",
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: "Nunito_800ExtraBold",
  },
  loginButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Nunito_800ExtraBold",
  },
  signupLink: {
    color: "#1E90FF",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Nunito_800ExtraBold",
  },
  copyright: {
    position: "absolute",
    alignItems: "center",
    bottom: 7,
  },
  copyrightText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Nunito_800ExtraBold",
  },
});

export default LoginScreen;
