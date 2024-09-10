import { StyleSheet, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";


export default function HelloWave(props: { onClickEventListener: (position: string) => void, isExpand: boolean }) {
  const moveAnimation = useSharedValue(0);
  const rotateAnimation = useSharedValue(0);
  let positon = "UP";

  if (props.isExpand) {
    positon = "DOWN";
    rotateAnimation.value = withTiming(180, { duration: 300 }); 
  } else {
    positon = "UP";
    rotateAnimation.value = withTiming(0, { duration: 300 }); 
  }

  const onCLick =  () => {
    if (positon == "UP") {
      positon = "DOWN";
      rotateAnimation.value = withTiming(180, { duration: 300 }); 
    } else {
      positon = "UP";
      rotateAnimation.value = withTiming(0, { duration: 300 }); 
    }

    props.onClickEventListener(positon);
  } 
  
  moveAnimation.value = withRepeat(
    withSequence(
      withTiming(-5, { duration: 900 }),
      withTiming(0, { duration: 1500 })
    ),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: moveAnimation.value }, 
      { rotate: `${rotateAnimation.value}deg` }, 
    ]
  }));

  return (
    <TouchableOpacity onPress={onCLick}>
      <View style={styles.container}>
        <Animated.Image
          source={require("./../../../assets/images/ic_arrow.png")}
          style={[styles.arrow, animatedStyle]} // Combine the regular and animated styles
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
  },
  arrow: {
    width: 10,
    height: 10,
  },
});
