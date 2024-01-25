import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants/theme'

export default function InputField({
    label, icon,icon2, inputType, keyBoardType, fieldButtonLabel, fieldButtonFunction, value, onChangeText,secureTextEntry
}) {
  return (
    <View style={styles.container}>
        {icon}
        {inputType == "password" ? (
            <TextInput autoCapitalize='none' style={styles.textInput} placeholder={label} keyboardType={keyBoardType} secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText} />
        ): (
            <TextInput autoCapitalize='none' style={styles.textInput} placeholder={label} keyboardType={keyBoardType} value={value} onChangeText={onChangeText} />
        )}
        {icon2}
        <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{color: COLORS.primary, ...FONTS.h4, fontWeight: '600'}}>{fieldButtonLabel}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        paddingBottom: SIZES.padding0,
        marginBottom: SIZES.padding3,
        paddingStart: SIZES.padding,
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        ...FONTS.body2,
    }
})