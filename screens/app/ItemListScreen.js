import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import React, { useEffect, useState } from "react";
import { MotiView } from "moti";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Button from "../../components/Button";

export default function ItemListScreen({ route, navigation }) {
  const [items, setItems] = useState([]);

  if (route.params) {
    const newItemTitle = items.some(
      (item) => item.title === route.params?.itemTitle
    );
    {
      !newItemTitle
        ? setItems([
            ...items,
            {
              id: items.length,
              title: newItemTitle,
              quantity: route.params?.quantity,
              price: route.params?.price,
              unit: route.params?.unit,
            },
          ])
        : Alert.alert(
            "Item exists",
            `${newItemTitle} already exists in the list.`
          );
    }
  }

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <MotiView
        style={styles.itemList}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: COLORS.primary,
            flexDirection: "row",
          }}
        >
          <Text style={styles.nameText}>{item.itemName}</Text>
          <Text style={styles.nameText}>{item.quantity}</Text>
          <Text style={styles.nameText}>{item.price}</Text>
          <Text style={styles.nameText}>{item.unit}</Text>
        </TouchableOpacity>
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="pencil"
          size={SIZES.icon1}
          color={COLORS.gray}
          onPress={() => navigation.navigate("UpdateItem", { formData: item })}
        />
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="remove-circle-outline"
          size={SIZES.icon1}
          color={COLORS.red}
          onPress={(item) => deleteItem(item.id)}
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
          Category Items
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: SIZES.padding3,
          paddingVertical: SIZES.padding2,
        }}
      >
        <FlatList
          data={items}
          ListEmptyComponent={() => <Text>No items found.</Text>}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Button label={"Home"} onPress={() => navigation.navigate("Home")} />
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
    height: 150,
    padding: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  itemList: {
    flexDirection: "row",
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
