import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";

import React, { useState } from "react";

interface Category {
  id: number;
  icon: any;
  label: string;
}

const Items: Category[] = [
  {
    id: 1,
    icon: require("../../../assets/images/ic_category_yoga.png"),
    label: "Yoga",
  },
  {
    id: 2,
    icon: require("../../../assets/images/ic_category_strength.png"),
    label: "Strength",
  },
  {
    id: 3,
    icon: require("../../../assets/images/ic_category_cardio.png"),
    label: "Cardio",
  },
  {
    id: 4,
    icon: require("../../../assets/images/ic_category_cycling.png"),
    label: "Cycling",
  },
];

export default function Categories() {
  const [idClick, setIdClick] = useState(1);

  function Category(props: { category: Category }) {
    const { category } = props;

    const onCLick = () => {
      setIdClick(category.id);
    };

    return (
      <TouchableOpacity onPress={onCLick}>
        <View
          style={[
            stylesCategory.container,
            { backgroundColor: idClick == category.id ? "#FFF" : "#4A4A4A" },
          ]}
        >
          <Image
            style={[
              stylesCategory.icon,
              { tintColor: idClick == category.id ? "#0B0A0A" : "#FFF" },
            ]}
            source={category.icon}
          />
          <Text
            style={[
              stylesCategory.label,
              { color: idClick == category.id ? "#0B0A0A" : "#FFF" },
            ]}
          >
            {category.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={Items}
        renderItem={({ item }) => <Category category={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}

const stylesCategory = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 32,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: "#4A4A4A",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginEnd: 8,
    tintColor: "#fff",
  },
  label: {
    color: "#fff",
  },
});

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 16,
  },
  container: {
    marginTop: 16,
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
