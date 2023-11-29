import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants/theme'



export default function Button({label, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.label}>
            {label}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary, 
        padding: SIZES.padding2, 
        borderRadius: SIZES.radius, 
        marginBottom: SIZES.body1
    },
    label: {
        color: '#fff',
        ...FONTS.button,
        textAlign: 'center',
    }
})