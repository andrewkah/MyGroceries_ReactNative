import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { FONTS, SIZES, COLORS } from "../../constants/theme";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import BASEURL, { getUsername, instance } from "../../config"
import { showAlert } from "../../components/Alert";

const AddItemScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [errors, setErrors] = useState({});

  const requiredForm = () => {
    let errors = {};
    if (!itemName) errors.itemName = "Item name is required";
    if (!quantity) errors.quantity = "Quantity is required";
    if (!price) errors.price = "Price is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const AddItem = async (name, quantity, price, unit, category) => {
    if (requiredForm()) {
      setIsLoading(true);
      const userName = await getUsername();
      try {
        const response = await instance.post(`${BASEURL}/category/item/add/${userName}`, {
          name,
          quantity,
          price,
          unit,
          category,
        });
        navigation.navigate('ItemList', {categoryId: category})
      } catch (e) {
        let errorMessage = e.response?.data || "An error occurred";
        showAlert("danger", "Error!", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
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
          value={itemName}
          keyBoardType="default"
          onChangeText={setItemName}
          errorSet={errors.itemName}
          errorText={errors.itemName}
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
          keyBoardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          errorSet={errors.quantity}
          errorText={errors.quantity}
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
          keyBoardType="numeric"
          value={price}
          onChangeText={setPrice}
          errorSet={errors.price}
          errorText={errors.price}
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
          keyBoardType="default"
          value={unit}
          onChangeText={setUnit}
          errorSet={errors.unit}
          errorText={errors.unit}
        />
        <Button
          label={"Add"}
          onPress={() => {
           AddItem(itemName, quantity, price, unit, route.params?.categoryId);
          }
          }
        />
        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
      </View>
    </SafeAreaView>
  );
};

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
    paddingTop: SIZES.padding2,
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

export default AddItemScreen;
