import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

const EventScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const events = [
    {
      id: 1,
      title: "Youth Conference",
      date: "2024-09-10",
      image: require("../../assets/images/youth-conference.jpg"),
      description: "A gathering for youth to discuss relevant topics.",
    },
    {
      id: 2,
      title: "Music Fest",
      date: "2024-09-15",
      image: require("../../assets/images/music-events.jpg"),
      description: "A festival featuring local bands and artists.",
    },
    {
      id: 3,
      title: "Charity Run",
      date: "2024-09-20",
      image: require("../../assets/images/charity-marathon.jpg"),
      description: "Join us in a 5k run to support local charities.",
    },
  ];

  const renderEventCards = () => {
    return events
      .filter((event) => !selectedDate || event.date === selectedDate)
      .map((event) => (
        <TouchableOpacity>
          <View key={event.id} style={styles.cardContainer}>
            <ImageBackground source={event.image} style={styles.cardImage}>
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{event.title}</Text>
                <Text style={styles.cardDate}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />{" "}
                  {event.date}
                </Text>
                <Text style={styles.cardDescription}>{event.description}</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      ));
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#00A2FF",
          },
        }}
        theme={{
          todayTextColor: "#00A2FF",
        }}
      />

      <ScrollView contentContainerStyle={styles.eventsContainer}>
        {renderEventCards()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventsContainer: {
    padding: 20,
  },
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire card with the overlay
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Dark overlay with slight transparency
  },
  cardContent: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Background for the content
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardDate: {
    color: "#ccc",
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
    lineHeight: 18,
  },
  detailsButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default EventScreen;
