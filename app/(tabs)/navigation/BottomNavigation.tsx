import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.iconContainer}>
          <View style={styles.navigationitem}>
            <Image
              style={styles.icon}
              source={require("./../../../assets/images/ic_navigation_home.png")}
            />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <View style={styles.navigationitem}>
            <Image
              style={styles.icon}
              source={require("./../../../assets/images/ic_navigation_people.png")}
            />
            <View style={styles.dot && {opacity: 0, height: 5}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <View style={styles.navigationitem}>
            <Image
              style={styles.icon}
              source={require("./../../../assets/images/ic_navigation_chat.png")}
            />
            <View style={styles.dot && {opacity: 0, height: 5}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <View style={styles.navigationitem}>
            <Image
              style={styles.icon}
              source={require("./../../../assets/images/ic_navigation_more.png")}
            />
            <View style={styles.dot && {opacity: 0, height: 5}} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
    marginBottom: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    height: 80,
    width: "80%",
    // iOS Shadow
    shadowColor: '#fff', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 10, 

    // Android Shadow
    elevation: 20, 
  },
  navigationitem: {
    flexDirection: "column",
    alignItems: "center",
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: "#FFF"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
});
