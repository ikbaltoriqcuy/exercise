import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, StyleSheet } from "react-native";
import Profile from "./profile/profile";
import ExerciseContent from "./exercise/exerciseContent";
import BottomSheetContent from "./bottom/bottomSheetContent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomNavigation from "./navigation/BottomNavigation";

export default function Exercise() {

  return (
    <View style={styles.container}>
      <Profile />
      <GestureHandlerRootView>
        <View style={styles.bottomSheet}>
          <ExerciseContent />
          <BottomSheetContent />
        </View>
        <BottomNavigation/>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  bottomSheet: {
    flex: 1,
    zIndex: 1000,
  },
});
