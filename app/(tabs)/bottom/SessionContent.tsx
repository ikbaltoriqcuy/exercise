import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon package

const { width, height } = Dimensions.get('window');

export default function SessionContent(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yoga Session</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.value}>30</Text>
          <Text style={styles.label}>mins</Text>
        </View>
        <Text style={styles.label2}>Duration</Text>
        <View style={styles.detailItem}>
          <Text style={styles.value}>250</Text>
          <Text style={styles.label}>kcal</Text>
        </View>
        <Text style={styles.label2}>Calories</Text>
      </View>

      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    width: '100%',
    height: 250
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    width: 120
  },
  detailsRow: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
  },
  value: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: 4,
    paddingTop: 10,
    fontWeight: 'bold'
  },
  label2: {
    fontSize: 14,
    color: "#908B8B",
    marginBottom: 16
  },
  playButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 10,
  },
});

