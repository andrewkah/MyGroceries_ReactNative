import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Button from "../components/Button";

export default function UpdateItemScreen({ navigation }) {
  const [counter, setCounter] = useState(0);

  const clickRemove = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  const clickAdd = () => {
    setCounter(counter + 1);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.header}>UpdateItem</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: SIZES.padding3,
          }}
        >
          <View>
            <Text style={styles.label}>Current stock</Text>
            <View style={styles.container5}>
              <Text style={styles.label1}>23</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Price</Text>
            <View style={styles.container5}>
              <Text style={styles.label1}>230.0</Text>
            </View>
          </View>
        </View>
        <View style={styles.container4}>
          <Text style={styles.label}>Items used:</Text>
          <View style={styles.itemContainer}>
            <View>
              <TouchableOpacity  onPress={clickRemove}>
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
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            label={"Done"}
            onPress={() => navigation.navigate("ItemList")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
