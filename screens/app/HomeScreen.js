import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  StatusBar,
  Alert,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

import { AuthContext } from "../../context/AuthContext";

export default function HomeScreen({ navigation, route }) {
  const { logout } = useContext(AuthContext);
  const { registrationData } = useContext(AuthContext);
  const data = [];

  const [categoryTitles, setCategoryTitles] = useState([]);

  React.useEffect(() => {
    if (route.params?.categoryTitle) {
      const categoryExists = categoryTitles.some(
        (item) => item.title === route.params?.categoryTitle
      );
      if (!categoryExists) {
        setCategoryTitles([
          ...categoryTitles,
          { id: categoryTitles.length, title: route.params?.categoryTitle },
        ]);
      } else {
        Alert.alert(
          "Category Exists",
          `${route.params?.categoryTitle} already exists in the list`
        );
      }
    }
  }, [route.params?.categoryTitle]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ ...FONTS.h2 }}>My Groceries</Text>
      </View>
      <View style={{ flex: 0.4 }}>
        <Text style={{ ...FONTS.h3 }}>Welcome {registrationData && registrationData.username}👋</Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.listHeader}>
          <Text style={{ ...FONTS.body2, color: COLORS.white }}>Recently Viewed</Text>
        </View>
        <FlatList
          data={data}
          horizontal={true}
          ListEmptyComponent={() => <Text>No items found.</Text>}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={styles.listHeader}>
          <Text style={{ ...FONTS.body2, color: COLORS.white }}>Category</Text>
          <Ionicons
            name="add-circle"
            size={SIZES.icon2}
            color={COLORS.white}
            onPress={() =>
              navigation.navigate("AddCategory")
            }
          />
        </View>
        <FlatList
          data={categoryTitles}
          ListEmptyComponent={() => <Text>No items found.</Text>}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.categoryList}
                onPress={() => navigation.navigate("ItemList")}
              >
                <Text style={styles.categoryText}>{item.title}</Text>
                <Ionicons
                  name="add-circle"
                  size={SIZES.icon2}
                  color={COLORS.white}
                  onPress={() => navigation.navigate("AddItem")}
                />
              </Pressable>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Text>HomeScreen</Text>
      <Button
        label={"Sign Out"}
        onPress={() => {
          logout();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: 65,
  },
  header: {
    flex: 0.45,
    alignItems: "center",
    paddingTop: SIZES.padding4,
    marginVertical: SIZES.padding,
  },

  listHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.background
  },
  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.padding2,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding2,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
