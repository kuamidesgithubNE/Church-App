// /navigation/BottomTabNavigator.js
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Imported screens
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import DonationScreen from "../screens/DonationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AnnouncementsScreen from "../screens/Announcement";
import CustomHeader from "../components/CustomHeader";

// Imported AppBar
import AppBar from "../components/AppBar";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomeScreen") {
              iconName = "home";
            } else if (route.name === "EventScreen") {
              iconName = "calendar";
            } else if (route.name === "Profile") {
              iconName = "person";
            } else if (route.name === "Donations") {
              iconName = "heart";
            } else if (route.name === "Announcements") {
              iconName = "megaphone";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            header: () => <AppBar />, // Pass the AppBar component here
          }}
        />
        <Tab.Screen
          name="EventScreen"
          component={EventScreen}
          options={{
            title: "Events",
            header: () => <AppBar />, // Pass the AppBar component here
          }}
        />
        <Tab.Screen
          name="Donations"
          component={DonationScreen}
          options={{
            title: "Donations",
            header: () => <AppBar />, // Pass the AppBar component here
          }}
        />
        <Tab.Screen
          name="Announcements"
          component={AnnouncementsScreen}
          options={{
            title: "Announcements",
            header: () => <AppBar />, // Pass the AppBar component here
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            header: () => <AppBar />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
