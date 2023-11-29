import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants/theme'

export default function InputField({
    label, icon, inputType, keyBoardType, fieldButtonLabel, fieldButtonFunction, value, onChangeText
}) {
  return (
    <View style={styles.container}>
        {icon}
        {inputType == "password" ? (
            <TextInput style={styles.textInput} placeholder={label} keyboardType={keyBoardType} secureTextEntry={true} value={value} onChangeText={onChangeText} />
        ): (
            <TextInput style={styles.textInput} placeholder={label} keyboardType={keyBoardType} value={value} onChangeText={onChangeText} />
        )}
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