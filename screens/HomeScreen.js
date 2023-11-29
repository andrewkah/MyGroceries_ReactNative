import { SafeAreaView, StyleSheet, Text, FlatList, View } from "react-native";
import React, { useContext } from "react";
import Button from "../components/Button";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";

import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const data = [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ ...FONTS.h2 }}>My Groceries</Text>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={{ ...FONTS.h3 }}>
          Welcome Andrew👋
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.listHeader}>
          <Text style={{...FONTS.body2}}>Recently Viewed</Text>
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
          <Text style={{...FONTS.body2}}>Category</Text>
          <Ionicons
            name="add-circle"
            size={SIZES.icon2}
            color={COLORS.gray}
            onPress={() => navigation.navigate("AddCategory")}
          />
        </View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Text>No items found.</Text>}
          renderItem={({ item }) => <Text>{item.title}</Text>}
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
    paddingVertical: SIZES.padding,
  },
  
  listHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding,
  },
});
