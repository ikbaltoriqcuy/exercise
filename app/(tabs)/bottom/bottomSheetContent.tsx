import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
import React, { useRef, useMemo, useCallback, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ArrowAnimation from "./ArrowAnimation";
import Categories from "./Categories";
import SessionContent from "./SessionContent";

export default function BottomsheetContent() {
  const snapPoints = useMemo(() => ["65%", "65%", "65%", "98%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const arrowClick = (position: string) => {
    if (position == "DOWN") {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.collapse();
    }
  };

  const handleSheetChange = useCallback((index: number) => {
    setIsExpand(index == 3);
  }, []);


  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={2}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#020810" }}
      handleIndicatorStyle={{ backgroundColor: "#020810" }}
      onChange={handleSheetChange}
    >
      <View style={styles.contentContainer}>
        <ArrowAnimation onClickEventListener={arrowClick} isExpand={isExpand} />
        <Categories/>
        <SessionContent/>
      </View>
    </BottomSheet>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
