import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Circle } from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, SharedValue } from "react-native-reanimated";


const ItemHorizontal = [
  { id: "1", name: "Information" },
  { id: "2", name: "StopWatch" },
];

interface ContentVertical {
  id: string;
  title: string;
  icon: any;
  colorProgress: string;
  titleItemOne: string;
  valueItemOne: string;
  actualValueItemOne: string;
  targetItemOne: string;
  titleItemTwo: string;
  valueItemTwo: string;
}

const ContensVertical: ContentVertical[] = [
  {
    id: "1",
    title: "Calories (Kcal)",
    icon: require("../../../assets/images/ic_energize.png"),
    colorProgress: "#5CD748",
    titleItemOne: "Steps",
    valueItemOne: "8624",
    actualValueItemOne: "8624",
    targetItemOne: "10000",
    titleItemTwo: "Distance",
    valueItemTwo: "3.8 km",
  },
  {
    id: "2",
    title: "Water (ml)",
    icon: require("../../../assets/images/ic_water.png"),
    colorProgress: "#7774FA",
    titleItemOne: "Average",
    valueItemOne: "1500 ml",
    actualValueItemOne: "1500",
    targetItemOne: "3000",
    titleItemTwo: "Glasses",
    valueItemTwo: "6/12 Glasses",
  },
  {
    id: "3",
    title: "Sleep (hr)",
    icon: require("../../../assets/images/ic_sleep.png"),
    colorProgress: "#FFC44E",
    titleItemOne: "Average",
    valueItemOne: "7 hr 34 m",
    actualValueItemOne: "6.5",
    targetItemOne: "8.5",
    titleItemTwo: "BedTime",
    valueItemTwo: "10:00 PM",
  },
];

const { width, height } = Dimensions.get("window");


export default function ExerciseContent() {
  const ITEM_WIDTH = width * 0.9 ;

  const scrollOffset = useSharedValue(0);

  return (
    <Animated.FlatList
      style={stylesMain.container}
      data={ItemHorizontal}
      renderItem={({ item, index }) =>
        (item.id == "1" ?  <ExerciseDataList scrollOffsetHorizontal={scrollOffset} index={index}/> : <StopWatch scrollOffsetHorizontal={scrollOffset} index={index}/> )
      }
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false} 
      snapToAlignment="center"
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast" 
      onScroll={(event)=> scrollOffset.value = event.nativeEvent.contentOffset.x }
    />
  );
}

function StopWatch(props: {scrollOffsetHorizontal: SharedValue<number>, index: number  }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const format = (num: number) => (num < 10 ? `0${num}` : num);
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };


  const { scrollOffsetHorizontal, index } = props;
  const ITEM_WIDTH = width * 0.9;

  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffsetHorizontal.value / ITEM_WIDTH;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(
            input,
            inputRange,
            [1, 1, 0.8],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[stylesStopWatch.container, animatedStyle]}>
      <View style={stylesStopWatch.header}>
        <Text style={stylesStopWatch.title}>Timer</Text>
        <Image
          style={stylesStopWatch.icon}
          source={require("../../../assets/images/ic_stopwatch.png")}
        />
      </View>

      <Text style={stylesStopWatch.timerText}>{formatTime(time)}</Text>
      <TouchableOpacity
        style={stylesStopWatch.startButton}
        onPress={() => setIsRunning(!isRunning)}
      >
        <Text style={stylesStopWatch.startButtonText}>
          {isRunning ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ExerciseDataList(props: {scrollOffsetHorizontal: SharedValue<number>, index: number  }) {
  const ITEM_HEIGHT_SNAP = height * 0.285;

  const scrollOffsetVertical = useSharedValue(0);


  const { scrollOffsetHorizontal, index } = props;
  const ITEM_WIDTH = width * 0.9;

  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffsetHorizontal.value / ITEM_WIDTH;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(
            input,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  
  return (
    <Animated.View style={[stylesHorizontalList.container, animatedStyle]}>
       <Animated.ScrollView
      snapToInterval={ITEM_HEIGHT_SNAP}
      snapToAlignment="center"
      decelerationRate="fast"
      onScroll={(event) => scrollOffsetVertical.value = event.nativeEvent.contentOffset.y }
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        style={stylesMain.container}
        data={ContensVertical}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item} scrollOffset={scrollOffsetVertical} index={index}/>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Animated.ScrollView>
    </Animated.View>
  );
}

function ExerciseItem(props: { item: ContentVertical, scrollOffset: SharedValue<number>, index: number  }) {
  const { item, scrollOffset, index } = props;
  const ITEM_HEIGHT = height * 0.26;

  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / ITEM_HEIGHT;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(
            input,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  
  return (
    <Animated.View style = {[stylesExerciseItem.container, animatedStyle] }>
      <View style={stylesExerciseItem.header}>
        <Text style={stylesExerciseItem.title}>{item.title}</Text>
        <Image source={item.icon} style={stylesExerciseItem.headerIcon} />
      </View>

      <View style={stylesExerciseItem.progressContainer}>
        <AnimatedCircularProgress
          style={{ marginLeft: 8 }}
          size={160}
          width={30}
          fill={80}
          tintColor={item.colorProgress}
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
          lineCap="round"
          renderCap={({ center }) => (
            <Circle
              cx={center.x}
              cy={center.y}
              r="15"
              fill={item.colorProgress}
            />
          )}
        />
        <View style={stylesExerciseItem.progressText}>
          <Text style={stylesExerciseItem.progressValue}>
            {item.actualValueItemOne}
          </Text>
          <Text style={stylesExerciseItem.progressLabel}>of</Text>
          <Text style={stylesExerciseItem.progressValue}>
            {item.targetItemOne}
          </Text>
        </View>
        <View style={stylesExerciseItem.detailsContainer}>
          <Text style={stylesExerciseItem.detailText}>{item.titleItemOne}</Text>
          <Text style={stylesExerciseItem.valueText}>{item.valueItemOne}</Text>
          <View style={{ height: 16 }} />
          <Text style={stylesExerciseItem.detailText}>{item.titleItemTwo}</Text>
          <Text style={stylesExerciseItem.valueText}>{item.valueItemTwo}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const stylesStopWatch = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020810",
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    width: width * 0.9,
    height: height * 0.26,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  icon: {
    tintColor: "#fff",
    width: 20,
    height: 20,
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 5,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#3e3e3e",
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    fontSize: 18,
    color: "#FD7231",
    fontWeight: "bold",
  },
});

const stylesMain = StyleSheet.create({
  container: {
    marginTop: 16
  },
});

const stylesHorizontalList = StyleSheet.create({
  container: {
    width: width * 0.98,
    height: height * 0.3,
  },
});

const stylesExerciseItem = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 16,
    marginBottom: 16,
    width: width * 0.9,
    height: height * 0.26,
    backgroundColor: "#020810",
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  headerIcon: {
    width: 20,
    height: 20,
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    marginLeft: 60,
    width: 60,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  progressValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressLabel: {
    color: "#BAB8B8",
    fontSize: 14,
  },
  detailsContainer: {
    marginLeft: 32,
    justifyContent: "center",
  },
  valueText: {
    color: "#aaa",
    fontSize: 14,
  },
  detailText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
