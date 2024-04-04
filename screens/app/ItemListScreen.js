import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { MotiView } from "moti";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Button from "../../components/Button";
import axios from "axios";
import BASEURL from "../../config";
import { showAlert } from "../../components/Alert";

const ItemListScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const GetItems = async (idNo) => {
    setIsLoading(true);
    try {
      const resItems = await axios.get(`${BASEURL}/category/item/${idNo}`);
      const result = resItems.data;
      setItems(result);
    } catch (error) {
      showAlert("danger", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
      GetItems(route.params.categoryId);
  }, [route.params, items]);

  const DeleteItem = async (idNo) => {
    try {
      const response = await axios.delete(`${BASEURL}/category/item/${idNo}`);
      let result = response.data;
      showAlert("success", result);
    } catch (error) {
      let errorMessage = error.response?.data || "An error occurred";
      showAlert("danger", errorMessage);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <MotiView
        style={styles.itemList}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <TouchableOpacity style={styles.items}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.nameText}>{item.quantity}</Text>
          <Text style={styles.nameText}>{item.price}</Text>
          <Text style={styles.nameText}>{item.unit}</Text>
        </TouchableOpacity>
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="pencil"
          size={SIZES.icon1}
          color={COLORS.gray}
          onPress={() =>
            navigation.navigate("UpdateItem", {
              itemId: item.itemId,
              formData: item,
            })
          }
        />
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="trash"
          size={SIZES.icon1}
          color={COLORS.red}
          onPress={() => DeleteItem(item.itemId)}
        />
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="arrow-back"
          size={SIZES.icon1}
          color={COLORS.white}
          onPress={() => navigation.navigate('Home')}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: -40 }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}
        >
          {route.params.category}
        </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: SIZES.padding3,
          paddingVertical: SIZES.padding2,
        }}
      >
        <FlatList
        style={{ backgroundColor: COLORS.palest, borderRadius: SIZES.radius, paddingHorizontal: SIZES.padding0 }}
          data={items}
          refreshing={true}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", flex: 1 }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text>No items found</Text>
              )}
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container1: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 150,
    padding: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  itemList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: SIZES.padding,
  },
  items: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  nameText: {
    color: COLORS.black,
    ...FONTS.body2,
    textTransform: "capitalize",
  },
});
