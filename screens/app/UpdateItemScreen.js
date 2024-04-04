import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import axios from "axios";
import BASEURL from "../../config";
import { showAlert } from "../../components/Alert";

const UpdateItemScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [item] = useState(route.params.formData);
  const [itemName, setItemName] = useState(route.params.formData.name);
  const [quantity, setQuantity] = useState(route.params.formData.quantity);
  const [price] = useState(route.params.formData.price);
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState(0);
  const [editable, setEditable] = useState(false);

  const requiredForm = () => {
    let errors = {};
    if (!itemName) errors.itemName = "Item name is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const UpdateItem = async (idNo, name, quantity, price) => {
    if (requiredForm()) {
      quantity -= counter;
      setIsLoading(true);
      try {
        const response = await axios.put(`${BASEURL}/category/item/${idNo}`, {
          name,
          quantity,
          price,
        });
        const result = response.data;
        if (result) {
          navigation.goBack();
          showAlert("success", `${result}, ${quantity} items remaining!`);
        }
      } catch (e) {
        let errorMessage = e.response?.data || "An error occurred";
        showAlert("danger", "Error!", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const clickRemove = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  const clickAdd = () => {
    if (counter < quantity) {
      setCounter(counter + 1);
    }
  };
  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleQuantityChange = (newQuantity) => {
    if (parseInt(newQuantity) >= route.params.formData.quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.header}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <View>
          <InputField
            style={styles.input}
            label={"item"}
            value={itemName}
            keyBoardType={"default"}
            onChangeText={setItemName}
            errorSet={errors.itemName}
            errorText={errors.itemName}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: SIZES.padding2,
          }}
        >
          <View>
            <Text style={styles.label}>Current stock</Text>
            <TouchableOpacity
              onPress={toggleEditable}
              style={styles.container5}
            >
              {editable ? (
                <TextInput
                  style={{...FONTS.h4}}
                  value={quantity}
                  onChangeText={handleQuantityChange}
                  onBlur={toggleEditable}
                  autoFocus
                  keyboardType="numeric"
                />
              ) : (
                <View style={styles.container5}>
                  <Text style={styles.label1}>{quantity}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Price</Text>
            <View style={styles.container5}>
              <Text style={styles.label1}>{item.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container4}>
          <Text style={styles.label}>Items used:</Text>
          <View style={styles.itemContainer}>
            <View>
              <TouchableOpacity onPress={clickRemove}>
                <Ionicons
                  name="remove-circle"
                  size={SIZES.icon1}
                  color={counter === 0 ? COLORS.gray : COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.label1}>{counter}</Text>
            <View>
              <TouchableOpacity onPress={clickAdd}>
                <Ionicons
                  name="add-circle"
                  size={SIZES.icon1}
                  color={counter === quantity ? COLORS.gray : COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            label={"Done"}
            onPress={() =>
              UpdateItem(route.params.itemId, itemName, quantity, price)
            }
          />
        </View>
        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
      </View>
    </SafeAreaView>
  );
};

export default UpdateItemScreen;

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
  },
  container2: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  container3: {
    flex: 1,
    paddingHorizontal: SIZES.padding3,
    marginVertical: SIZES.padding3,
  },
  label: {
    ...FONTS.h4,
    marginStart: 5,
  },
  input: {
    paddingVertical: SIZES.padding3,
  },
  label1: {
    ...FONTS.h2,
  },
  container4: {
    marginVertical: SIZES.padding3,
  },
  container5: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 80,
    backgroundColor: COLORS.paleBackground,
    padding: SIZES.font,
    borderRadius: SIZES.radius,
  },
  itemContainer: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.paleBackground,
    padding: SIZES.font,
    borderRadius: SIZES.radius,
  },
  button: {
    marginTop: SIZES.padding2,
  },
});
