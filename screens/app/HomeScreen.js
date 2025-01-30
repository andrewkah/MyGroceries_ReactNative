import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { showAlert } from "../../components/Alert";
import instance, { getUsername } from "../../config";
// import { MotiView } from "moti";

const HomeScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const [categoryTitles, setCategoryTitles] = useState([]);
  const [registrationData, setRegistrationData] = useState("");
  const data = [
    require("../../assets/images/vegetables1.jpg"),
    require("../../assets/images/I4iuDyn9.jpg"),
    require("../../assets/images/dairy2.jpg"),
    require("../../assets/images/baked1.jpg"),
    require("../../assets/images/meat1.jpg"),
    require("../../assets/images/canned1.jpg"),
    require("../../assets/images/snacks1.jpg"),
    require("../../assets/images/rice1.jpg"),
    require("../../assets/images/beverage1.jpg"),
    require("../../assets/images/spices1.jpg"),
    require("../../assets/images/cleaning1.jpg"),
  ];

  const returnUsername = async () => {
    const userName = await getUsername();
    setRegistrationData(userName);
  };

  const renderItem = ({ item }) => {
    return (
      // <MotiView
      //   from={{ opacity: 0, scale: 0.9 }}
      //   animate={{ opacity: 1, scale: 1 }}
      // >
      <View style={styles.imageContainer}>
        <Image source={item} style={styles.image} />
      </View>
      // {/* </MotiView> */}
    );
  };

  const fetchCategories = async () => {
    const userName = await getUsername();
    setIsLoading(true);
    try {
      const response = await instance.get(`/category/${userName}`);
      let result = response.data;
      setCategoryTitles(result);
    } catch (error) {
      let errorMessage = error.response?.data || "Error fetching Categories";
      showAlert("danger", errorMessage, "Please try again");
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteCategory = async (idNo) => {
    const userName = await getUsername();
    setIsDeleteLoading(true);
    try {
      const response = await instance.delete(`/category/${idNo}/${userName}`);
      let result = response.data;
      showAlert("success", result);
      await fetchCategories();
    } catch (error) {
      let errorMessage = error.response?.data || "Error deleting Categories";
      showAlert("danger", errorMessage, "Please try again");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useLayoutEffect(() => {
    returnUsername();
    fetchCategories();
  }, [route.params, categoryTitles]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: SIZES.padding4,
          marginVertical: SIZES.padding,
        }}
      >
        <View style={styles.header}>
          <Text style={{ ...FONTS.h2 }}>My Groceries</Text>
        </View>
        <Pressable
          style={{ marginBottom: SIZES.padding0, alignItems: "center" }}
          onPress={() => {
            logout();
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={SIZES.icon1}
            color={COLORS.red}
          />
          <Text style={{ ...FONTS.body4, color: COLORS.red }}>Log Out</Text>
        </Pressable>
      </View>
      <View style={{ paddingVertical: SIZES.padding }}>
        <Text
          style={{
            ...FONTS.h3,
            paddingTop: SIZES.padding,
            textTransform: "capitalize",
          }}
        >
          Welcome {registrationData} 👋
        </Text>
      </View>
      <View style={{ flex: 1.5 }}>
        <View style={styles.listHeader}>
          <Text style={{ ...FONTS.body3 }}>Top Choices</Text>
        </View>
        <FlatList
          style={{
            backgroundColor: COLORS.palest,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding0,
          }}
          data={data}
          horizontal={true}
          refreshing={true}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center" }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text>No items found</Text>
              )}
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={true}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={[styles.listHeader, { marginBottom: SIZES.padding0 }]}>
          <Text style={{ ...FONTS.body2 }}>Category</Text>
          <Ionicons
            name="add-circle"
            size={SIZES.icon2}
            color={COLORS.black}
            onPress={() => navigation.navigate("AddCategory")}
          />
        </View>
        <FlatList
          style={{
            backgroundColor: COLORS.palest,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding0,
          }}
          data={categoryTitles}
          refreshing={true}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                marginTop: SIZES.padding,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text>No categories found</Text>
              )}
            </View>
          )}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.categoryList}
                onPress={() =>
                  navigation.navigate("ItemList", {
                    categoryId: item.categoryId,
                    category: item.name,
                  })
                }
              >
                <Text style={styles.categoryText}>{item.name}</Text>
                <View style={styles.icons}>
                  <Ionicons
                    name="add-circle"
                    size={SIZES.icon2}
                    color={COLORS.white}
                    onPress={() =>
                      navigation.navigate("AddItem", {
                        categoryId: item.categoryId,
                      })
                    }
                  />
                  <Ionicons
                    name="trash"
                    size={SIZES.icon2}
                    color={COLORS.red}
                    onPress={() => DeleteCategory(item.categoryId)}
                  />
                </View>
              </Pressable>
            </View>
          )}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item) => item.categoryId}
        />
      </View>

      {isDeleteLoading && (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: 65,
  },
  header: {
    flex: 2,
    alignItems: "center",
  },
  imageContainer: {
    marginHorizontal: SIZES.padding2,
    marginBottom: SIZES.padding0,
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
  },

  listHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding,
  },
  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.padding2,
    paddingVertical: SIZES.padding2,
    paddingHorizontal: SIZES.padding2,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    alignItems: "flex-start",
    ...FONTS.h3,
    color: COLORS.white,
    maxWidth: 230,
  },

  icons: {
    flexDirection: "row",
    width: 80,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
