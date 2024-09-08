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
import { register } from "../utils/api";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //for form vailidation
  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await register(email, password);
      if (result.message === "User registered successfully!") {
        Alert.alert("Success Message", result.message);
        setTimeout(() => {
          setLoading(false);
          navigation.replace("LoginScreen"); // Navigate to the login screen after signup
        }, 2000);
      } else {
        Alert.alert("Error Message", result.message);
      }
    } catch (error) {
      Alert.alert("Error Message", "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.background}
    >
      <Text style={styles.logo}>DigiChurch</Text>

      <View style={styles.signupBox}>
        <Text style={styles.header}>Create Account</Text>
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

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.loginLink}>Login here</Text>
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
  signupBox: {
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
    fontFamily: "Nunito_800ExtraBold",
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
  },
  signupButton: {
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
  loginLink: {
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

export default SignupScreen;
