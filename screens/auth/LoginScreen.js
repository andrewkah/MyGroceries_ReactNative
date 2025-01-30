import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginSVG from "../../assets/images/groceries-svgrepo-com.svg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!username) errors.username = "User name is required";
    if (!password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }

    return null;
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <View>
        <KeyboardAwareScrollView>
          <View style={{ alignItems: "center" }}>
            <LoginSVG height={160} width={160} />
          </View>
          <Text style={styles.header}>Login</Text>
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
            keyBoardType="default"
            value={username}
            autoComplete={"username"}
            onChangeText={(text) => setUsername(text)}
            errorSet={errors.username}
            errorText={errors.username}
          />

          <InputField
            label={"Password"}
            secureTextEntry={!showPassword}
            icon={
              <Ionicons
                name="lock-closed"
                size={SIZES.icon0}
                color={COLORS.gray}
                style={styles.icon}
              />
            }
            icon2={
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={SIZES.icon1}
                color={COLORS.gray}
                style={{ marginRight: 15 }}
                onPress={toggleShowPassword}
              />
            }
            inputType="password"
            autoComplete={"password"}
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => navigation.navigate("ForgotPassword")}
            value={password}
            onChangeText={(text) => setPassword(text)}
            errorSet={errors.password}
            errorText={errors.password}
          />

          <Button
            label={"Login"}
            onPress={() => {
              checkPasswordValidity(password);
              if (validateForm()) login(username, password);
            }}
          />
          <View style={styles.register}>
            <Text style={{ ...FONTS.body3 }}>New to the app? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: 35,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    ...FONTS.h1,
    color: COLORS.black,
    marginTop: 100,
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
