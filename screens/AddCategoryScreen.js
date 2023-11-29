import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import React from "react";
import { MotiView } from "moti";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export default function AddCategoryScreen({ navigation }) {
  const categoryList = [
    {
      id: "1",
      title: "Vegetables",
      image: require("../assets/images/vegetables1.jpg"),
    },
    {
      id: "2",
      title: "Fruits",
      image: require("../assets/images/I4iuDyn9.jpg"),
    },
    {
      id: "3",
      title: "Dairy goods and Eggs",
      image: require("../assets/images/dairy2.jpg"),
    },
    {
      id: "4",
      title: "Baked Goods",
      image: require("../assets/images/baked1.jpg"),
    },
    {
      id: "5",
      title: "Meat and Other Sauces",
      image: require("../assets/images/meat1.jpg"),
    },
    {
      id: "6",
      title: "Canned Goods",
      image: require("../assets/images/canned1.jpg"),
    },
    {
      id: "7",
      title: "Snacks",
      image: require("../assets/images/snacks1.jpg"),
    },
    {
      id: "8",
      title: "Staple food",
      image: require("../assets/images/rice1.jpg"),
    },
    {
      id: "9",
      title: "Beverages",
      image: require("../assets/images/beverage1.jpg"),
    },
    {
      id: "10",
      title: "Condiments, Spices and Seasonings",
      image: require("../assets/images/spices1.jpg"),
    },
    {
      id: "11",
      title: "Household and Cleaning Supplies",
      image: require("../assets/images/cleaning1.jpg"),
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <MotiView
        style={styles.categoryList}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <TouchableOpacity style={{alignItems: "center",}} onPress={() => navigation.navigate("AddItem")}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={styles.nameText}>{item.title}</Text>
        </TouchableOpacity>
      </MotiView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Ionicons
          style={{ marginTop: 25, marginStart: 15 }}
          name="arrow-back"
          size={SIZES.icon1}
          color={COLORS.white}
          onPress={() => navigation.navigate("Home")}
        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            marginStart: 45,
            marginTop: 60,
          }}
        >
          Add New Category
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: SIZES.padding3,
          paddingVertical: SIZES.padding2,
        }}
      >
        <FlatList
          data={categoryList}
          ListEmptyComponent={() => <Text>No items found.</Text>}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 130,
    padding: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  categoryList: {
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 2 - 80,
  },
  imageContainer: {
    margin: SIZES.padding2,
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  nameText: {
    color: COLORS.black,
    ...FONTS.body3,
  },
});
