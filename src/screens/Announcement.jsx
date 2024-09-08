// /components/AnnouncementsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AnnouncementsScreen = () => {
  const announcements = [
    { id: '1', title: 'Church Picnic', date: '2024-09-10', description: 'Join us for a fun day at the park...' },
    { id: '2', title: 'Prayer Meeting', date: '2024-09-12', description: 'We will gather for our monthly prayer meeting...' },
    // Add more announcements as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.announcementItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  announcementItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 16,
  },
});

export default AnnouncementsScreen;
