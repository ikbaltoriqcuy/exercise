
import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';

export default function Profile() {
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/ic_avatar.png')} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Hi,John</Text>
          <Text style={styles.messageText}>Ready for next victory? Let's do this</Text>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#1E1E1E',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 60,
      marginHorizontal: 16,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    textContainer: {
      justifyContent: 'center',
    },
    greetingText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    messageText: {
      color: '#AAAAAA',
      fontSize: 12,
    },
  });
  