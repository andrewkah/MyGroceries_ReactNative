import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginSVG from '../assets/images/groceries-svgrepo-com.svg';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({navigation}) {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const checkPasswordValidity = value => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
          return 'Password must not contain Whitespaces.';
        }
    
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
          return 'Password must have at least one Uppercase Character.';
        }
    
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
          return 'Password must have at least one Lowercase Character.';
        }
    
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
          return 'Password must contain at least one Digit.';
        }
    
        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
          return 'Password must be 8-16 Characters Long.';
        }
    
        return null;
      };
    

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <KeyboardAwareScrollView >
                <View style={{alignItems: 'center'}}>
                    <LoginSVG height={160} width={160}/>
                </View>
                <Text style={styles.header}>
                    Login
                </Text>
                <InputField 
                    label={'User name'}
                    icon={
                        <Ionicons name="person" size={SIZES.icon0} color={COLORS.gray} style={styles.icon}/>
                    }
                    keyboardType='text'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    />
                
                <InputField 
                    label={'Password'}
                    icon={
                        <Ionicons name="ios-lock-closed" size={SIZES.icon0} color={COLORS.gray} style={styles.icon}/>
                    }
                    inputType="password"
                    fieldButtonLabel={"Forgot?"}
                    fieldButtonFunction={() => {}}
                    value= {password}
                    onChangeText={(text) => setPassword(text)}
                />
                
                <Button label={'Login'} onPress={() => {login(username, password)}}/>
                <View style={styles.register}>
                    <Text style={{...FONTS.body4}}>New to the app? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{color: COLORS.primary, ...FONTS.h4}}>Register</Text>
                    </TouchableOpacity>
                </View>         
        </KeyboardAwareScrollView>
        </View>
       
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding3,
        paddingBottom: 35,
    },
    header: {
        flex:1,
        justifyContent: 'center',
        ...FONTS.h1,
        color: COLORS.black,
        marginTop: 100,
        marginBottom: 30,
    },

    icon: {
        marginRight: 12,
    },
    register: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    }
})