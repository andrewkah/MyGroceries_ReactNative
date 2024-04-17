import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import LoginSVG from "../../assets/images/groceries-svgrepo-com.svg";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { showAlert } from "../../components/Alert";
import BASEURL from "../../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};
    if (!token) errors.token = "Token is required";
    if (!newPassword) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = async (token, newPassword) => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BASEURL}/auth/reset-password`, {
          token,
          newPassword,
        });
        const { result } = response.data;
        showAlert("success", "Success", result);
        navigation.navigate("Login");
      } catch (err) {
        showAlert("danger", "Error", err.message);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <View>
        <KeyboardAwareScrollView>
          <View style={{ alignItems: "center" }}>
            <LoginSVG height={160} width={160} />
          </View>
          <View style={styles.header}>
            <Text style={{ ...FONTS.h1, color: COLORS.black }}>
              Reset Password
            </Text>
          </View>
          <View>
            <InputField
              label={"Token"}
              icon={
                <Ionicons
                  name="person"
                  size={SIZES.icon0}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              value={token}
              onChangeText={(text) => setToken(text)}
              keyBoardType="default"
              errorSet={errors.token}
              errorText={errors.token}
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
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
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
              autoComplete={'password'}
              errorSet={errors.password}
              errorText={errors.password}
            />
            <Button
              label={"Reset Password"}
              onPress={() => {
                handleResetPassword(token, newPassword);
              }}
            />
            {isLoading && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: SIZES.padding3,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    marginTop: 90,
    marginBottom: 30,
  },

  icon: {
    marginRight: 12,
  },
});
