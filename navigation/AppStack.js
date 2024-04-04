import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/app/HomeScreen";
import AddCategoryScreen from "../screens/app/AddCategoryScreen";
import AddItemScreen from "../screens/app/AddItemScreen";
import UpdateItemScreen from "../screens/app/UpdateItemScreen";
import ItemListScreen from "../screens/app/ItemListScreen";

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
