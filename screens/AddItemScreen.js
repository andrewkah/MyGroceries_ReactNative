import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import { FONTS, SIZES, COLORS } from "../constants/theme";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function AddItemScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Ionicons style={{ marginTop: 25, marginStart: 15}}
          name="arrow-back-outline"
          size={SIZES.icon1}
          color={COLORS.white}
          onPress={() => navigation.navigate("AddCategory")}
        />
        <Text style={{ color: COLORS.white, ...FONTS.h2, marginStart: 55, marginTop: 60 }}>
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
          // value={username}
          // onChangeText={(text) => setUsername(text)}
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
          keyboardType="text"
          // value={username}
          // onChangeText={(text) => setUsername(text)}
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
          keyboardType="text"
          // value={username}
          // onChangeText={(text) => setUsername(text)}
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
          // value={username}
          // onChangeText={(text) => setUsername(text)}
        />
        <Button label={"Add"} onPress={()=> navigation.navigate('UpdateItem')}/>
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
  form: {
    flex: 6,
    justifyContent: 'space-evenly',
    paddingHorizontal: SIZES.padding3,
    paddingVertical: 60,
  },
  input: {
    paddingVertical: SIZES.padding3,
  },
  icon: {
    marginRight: SIZES.padding2,
  },
});
