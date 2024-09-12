import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const sermons = [
  {
    id: "1",
    title: "Destined to Win",
    pastor: "Pastor I.S. James",
    image: require("../../assets/images/background2.jpg"),
  },
  {
    id: "2",
    title: "Reigning in Life",
    pastor: "Pastor I.S. James",
    image: require("../../assets/images/background3.jpg"),
  },
];

const devotions = [
  {
    id: "1",
    title: "The Message of the Cross",
    pastor: "Simon C. Simon",
    image: require("../../assets/images/background2.jpg"),
  },
  {
    id: "2",
    title: "Spiritual Warfare",
    pastor: "Andrew Kalu",
    image: require("../../assets/images/background3.jpg"),
  },
];

const Homepage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Welcome Banner */}
        <ImageBackground
          style={styles.welcomeBanner}
          source={require("../../assets/images/scripture.jpeg")}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Verse of the day</Text>
            <Text style={styles.scriptureText}>
              “For where two or three gather in my name, there am I with them.”
              – Matthew 18:20
            </Text>
          </View>
        </ImageBackground>

        {/* Quick Triggers */}
        <View style={styles.quickTriggers}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate("Testimony")}
          >
            <Ionicons name="chatbubbles-outline" size={20} color="#00A2FF" />
            <Text style={styles.quickButtonText}>Testimonies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate("PrayerRequest")}
          >
            <Ionicons name="help-circle-outline" size={20} color="#00A2FF" />
            <Text style={styles.quickButtonText}>Prayer Request</Text>
          </TouchableOpacity>
        </View>

        {/* Latest Sermons */}
        <Text style={styles.sectionTitle}>Latest Sermons</Text>
        <FlatList
          horizontal
          data={sermons}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.sermonCard}>
              <ImageBackground source={item.image} style={styles.sermonImage}>
                <View style={styles.sermonCardContent}>
                  <View>
                    <Text style={styles.sermonTitle}>{item.title}</Text>
                    <Text style={styles.sermonPastor}>{item.pastor}</Text>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons
                      name="play-circle-outline"
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/* Devotions for You */}
        <Text style={styles.sectionTitle}>Devotions for You</Text>
        {devotions.map((item) => (
          <TouchableOpacity key={item.id} style={styles.devotionCard}>
            <Image source={item.image} style={styles.devotionImage} />
            <View style={styles.devotionTextContainer}>
              <Text style={styles.devotionTitle}>{item.title}</Text>
              <Text style={styles.devotionPastor}>{item.pastor}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },

  // Bible Quote Card
  welcomeBanner: {
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 30,
    height: 180,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  welcomeText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scriptureText: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  // Quick Triggers
  quickTriggers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quickButtonText: {
    fontSize: 15,
    marginLeft: 10,
    color: "#00A2FF",
  },

  // Section Titles
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 20,
    marginVertical: 10,
    color: "#333",
  },

  // Sermon Card
  sermonCard: {
    width: 230,
    height: 130,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  sermonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  sermonCardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 70,
    gap: 70,
  },
  sermonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  sermonPastor: {
    fontSize: 12,
    color: "#fff",
  },
  playButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Devotion Card
  devotionCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 120,
  },
  devotionImage: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  devotionTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  devotionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  devotionPastor: {
    fontSize: 12,
    color: "#666",
  },
});

export default Homepage;
