import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import AddCategoryScreen from "../screens/AddCategoryScreen";
import AddItemScreen from "../screens/AddItemScreen";
import UpdateItemScreen from "../screens/UpdateItemScreen";
import ItemListScreen from "../screens/ItemListScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
      />
      <Stack.Screen
        name="UpdateItem"
        component={UpdateItemScreen}
      />
      <Stack.Screen
        name="ItemList"
        component={ItemListScreen}
      />
    </Stack.Navigator>
  );
}
