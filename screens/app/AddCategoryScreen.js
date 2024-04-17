import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import React, { useState } from "react";
import { MotiView } from "moti";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import BASEURL, { getUsername, instance } from "../../config";
import { showAlert } from "../../components/Alert";

const AddCategoryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const categoryList = [
    {
      id: 0,
      title: "Vegetables",
      image: require("../../assets/images/vegetables1.jpg"),
    },
    {
      id: 1,
      title: "Fruits",
      image: require("../../assets/images/I4iuDyn9.jpg"),
    },
    {
      id: 2,
      title: "Dairy goods and Eggs",
      image: require("../../assets/images/dairy2.jpg"),
    },
    {
      id: 3,
      title: "Baked Goods",
      image: require("../../assets/images/baked1.jpg"),
    },
    {
      id: 4,
      title: "Meat and Other Sauces",
      image: require("../../assets/images/meat1.jpg"),
    },
    {
      id: 5,
      title: "Canned Goods",
      image: require("../../assets/images/canned1.jpg"),
    },
    {
      id: 6,
      title: "Snacks",
      image: require("../../assets/images/snacks1.jpg"),
    },
    {
      id: 7,
      title: "Staple food",
      image: require("../../assets/images/rice1.jpg"),
    },
    {
      id: 8,
      title: "Beverages",
      image: require("../../assets/images/beverage1.jpg"),
    },
    {
      id: 9,
      title: "Condiments, Spices and Seasonings",
      image: require("../../assets/images/spices1.jpg"),
    },
    {
      id: 10,
      title: "Household and Cleaning Supplies",
      image: require("../../assets/images/cleaning1.jpg"),
    },
  ];

  const AddCategory = async (name) => {
    const username = await getUsername();
    try {
      setIsLoading(true);
      const category = await instance.post(`${BASEURL}/category/add`, {
        name,
        username,
      });
      let result = category.data;
      let idNo = result.categoryId;
      navigation.navigate("Home", { categoryTitle: name, categoryId: idNo });
    } catch (e) {
      let errorMessage = e.response?.data || "Could not submit Category";
      errorMessage && showAlert("danger", errorMessage, "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <MotiView
        style={styles.categoryList}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            AddCategory(item.title);
          }}
        >
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
      <StatusBar hidden={false} translucent={true} />
      <View style={styles.container1}>
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="arrow-back"
          size={SIZES.icon1}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            marginStart: 45,
            marginTop: 80,
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
        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
        <FlatList
          style={{ backgroundColor: COLORS.palest, borderRadius: SIZES.radius }}
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
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container1: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 150,
    padding: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: SIZES.padding2,
  },
  categoryList: {
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 2 - 70,
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
