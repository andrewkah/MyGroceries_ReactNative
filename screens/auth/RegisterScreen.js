import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginSVG from "../../assets/images/groceries-svgrepo-com.svg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { registerUser } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View>
        <KeyboardAwareScrollView>
          <View style={{ alignItems: "center" }}>
            <LoginSVG height={160} width={160} />
          </View>
          <Text style={styles.header}>Register</Text>
          <InputField
            label={"User name"}
            icon={
              <Ionicons
                name="person"
                size={SIZES.icon0}
                color={COLORS.gray}
                style={styles.icon}
              />
            }
            value={username}
            onChangeText={(text) => setUsername(text)}
            keyboardType="text"
          />
          <InputField
            label={"Email Address"}
            icon={
              <MaterialIcons
                name="mail"
                size={SIZES.icon0}
                color={COLORS.gray}
                style={styles.icon}
              />
            }
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <InputField
            label={"Password"}
            secureTextEntry={!showPassword}
            icon={
              <Ionicons
                name="ios-lock-closed"
                size={SIZES.icon0}
                color={COLORS.gray}
                style={styles.icon}
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
            icon2={
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={SIZES.icon1}
                color={COLORS.gray}
                style={{ marginRight: 18, marginTop: 5 }}
                onPress={toggleShowPassword}
              />
            }
            inputType="password"
          />

          <Button
            label={"Register"}
            onPress={() => {
              registerUser(username, email, password, () => {
                navigation.navigate("Home");
              });
            }}
          />
          <View style={styles.register}>
            <Text style={{ ...FONTS.body4 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: SIZES.padding3,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    ...FONTS.h1,
    color: COLORS.black,
    marginTop: 90,
    marginBottom: 30,
  },

  icon: {
    marginRight: 12,
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
});
