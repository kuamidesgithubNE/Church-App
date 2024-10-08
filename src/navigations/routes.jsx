// /navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// imported pages
import LoaderScreen from "../screens/LoaderScreen";
import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUp";
import BottomTabNavigator from "./BottomNavigation";
import DonationDetails from "../components/DonationDetails";
import DonationModal from "../components/DonationModal";
import EditProfileScreen from "../components/EditProfile";
import CustomHeader from "../components/CustomHeader";
import TestimoniesScreen from "../screens/TestimonyScreen";
import PrayerRequestsScreen from "../screens/PrayerRequest";
import OfferingScreen from "../screens/OfferingScreen";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoaderScreen">
        <Stack.Screen
          name="LoaderScreen"
          component={LoaderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonationDetails"
          component={DonationDetails}
          options={{
            header: () => (
              <CustomHeader
                title="Donation Details"
                onEditPress={() => {
                  // Handle edit press
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="DonateModal"
          component={DonationModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            header: () => <CustomHeader title="Edit Profile" />,
          }}
        />
        <Stack.Screen
          name="Testimony"
          component={TestimoniesScreen}
          options={{
            header: () => <CustomHeader title="Testimony" />,
          }}
        />
        <Stack.Screen
          name="PrayerRequest"
          component={PrayerRequestsScreen}
          options={{
            header: () => <CustomHeader title="Prayer Request" />,
          }}
        />

        <Stack.Screen
          name="Offering"
          component={OfferingScreen}
          options={{
            header: () => <CustomHeader title="Offering" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
