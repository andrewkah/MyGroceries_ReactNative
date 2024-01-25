import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { FONTS, SIZES, COLORS } from "../../constants/theme";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

export default function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");

  const handleItemName = (text) => {setItemName(text)};
  const handleQuantity = (text) => {
    const qtyValue = parseFloat(text);
    if (isNaN(qtyValue)) {
      setQuantity("invalid input");
    } else {
      setQuantity(qtyValue);
    }
  };
  const handlePrice = (text) => {
    const priceValue = parseFloat(text);
    if (isNaN(priceValue)) {
      setPrice("Invalid input");
    } else {
      setPrice(priceValue);
    }
  };
  const handleUnit = (text) => setUnit(text);

  // const collectFormData = () => {
  //   return {
  //     itemName,
  //     quantity,
  //     price,
  //     unit,
  //   };
  // };

  const handleSubmit = () => {
    // const formData = collectFormData();

    navigation.navigate("ItemList", { 
      itemTitle: itemName,
      quantity: quantity,
      price: price,
      unit: unit,
     });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Ionicons
          style={{ marginTop: 35, marginStart: 15 }}
          name="arrow-back-outline"
          size={SIZES.icon1}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            marginStart: 55,
            marginTop: 80,
          }}
        >
          Post New Item
        </Text>
      </View>
      <View style={styles.form}>
        <InputField
          style={styles.input}
          label={"Item Name"}
          icon={
            <Ionicons
              name="list-circle"
              size={SIZES.icon0}
              color={COLORS.gray}
              style={styles.icon}
            />
          }
          keyboardType="text"
          onChangeText={handleItemName}
        />

        <InputField
          style={styles.input}
          label={"Quantity"}
          icon={
            <Ionicons
              name="cube"
              size={SIZES.icon0}
              color={COLORS.gray}
              style={styles.icon}
            />
          }
          keyboardType="numeric"
          onChangeText={handleQuantity}
        />
        <InputField
          style={styles.input}
          label={"Price (UGX)"}
          icon={
            <Ionicons
              name="cash"
              size={SIZES.icon0}
              color={COLORS.gray}
              style={styles.icon}
            />
          }
          keyboardType="numeric"
          onChangeText={handlePrice}
        />
        <InputField
          style={styles.input}
          label={"Unit (Kg, Bunches...)"}
          icon={
            <Ionicons
              name="barbell"
              size={SIZES.icon0}
              color={COLORS.gray}
              style={styles.icon}
            />
          }
          keyboardType="text"
          onChangeText={handleUnit}
        />
        <Button label={"Add"} onPress={handleSubmit} />
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
  form: {
    flex: 6,
    justifyContent: "space-evenly",
    paddingHorizontal: SIZES.padding3,
    paddingVertical: 20,
  },
  input: {
    paddingVertical: SIZES.padding3,
  },
  icon: {
    marginRight: SIZES.padding2,
  },
});
