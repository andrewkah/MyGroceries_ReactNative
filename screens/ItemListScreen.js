import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import React, { useEffect, useState } from "react";
import { MotiView } from "moti";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export default function ItemListScreen({ route, navigation }) {
  const [items, setItems] = useState([]);
  let counter = 1;
  
  useEffect(() => {
    if (route.params){
      const newItem = route.params.formData;
      setItems([...items, {id: counter, ...newItem }]);
      counter++;
    }
  }, [route.params]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <MotiView
        style={styles.categoryList}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <TouchableOpacity style={{alignItems: "center",}}>
          <Text style={styles.nameText}>{item.itemName}</Text>
          <Text style={styles.nameText}>{item.quantity}</Text>
          <Text style={styles.nameText}>{item.price}</Text>
          <Text style={styles.nameText}>{item.unit}</Text>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate("Home")}
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
    height: 150,
    padding: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
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