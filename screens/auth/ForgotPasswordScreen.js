import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Button from "../../components/Button";
import LoginSVG from "../../assets/images/groceries-svgrepo-com.svg";
import { StatusBar } from "expo-status-bar";
import { showAlert } from "../../components/Alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import instance from "../../config";

const ForgotPasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!username) errors.username = "Username is required";
    if (!emailAddress) errors.emailAddress = "Email Address is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmail = async (userName, email) => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await instance.post(`/auth/forgot-password`, {
          userName,
          email,
        });
        const { result } = response;
        showAlert(
          "success",
          result,
          "Check your email inbox for the reset token."
        );
        navigation.navigate("ResetPassword");
      } catch (err) {
        showAlert("danger", "Error", `Could not send link: ${err.message}`);
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
              Forgot Password{" "}
            </Text>
          </View>
          <View style={styles.subHeader}>
            <Text style={{ ...FONTS.body3 }}>
              Enter your email address below to reset your password.
            </Text>
          </View>
          <View>
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
              autoComplete={'username'}
              onChangeText={(text) => setUsername(text)}
              keyBoardType="default"
              errorSet={errors.username}
              errorText={errors.username}
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
              value={emailAddress}
              autoComplete={'email'}
              onChangeText={(text) => setEmailAddress(text)}
              keyBoardType="email-address"
              errorSet={errors.emailAddress}
              errorText={errors.emailAddress}
            />
            <Button
              label={"Send reset link"}
              onPress={() => {
                handleEmail(username, emailAddress);
              }}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>
                Back to Login
              </Text>
            </TouchableOpacity>
            {isLoading && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding3,
    paddingBottom: 35,
  },
  header: {
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 15,
  },
  subHeader: {
    justifyContent: "center",
    marginBottom: 30,
  },

  icon: {
    marginRight: 12,
  },
});
