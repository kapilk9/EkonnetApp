import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { COLORS, SIZES, FONTS } from "../constants"
import { useNavigation } from '@react-navigation/native';
const TextButton = ({ label, containerStyle, onPress }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 18,
            paddingVertical: 3,
            borderRadius: 15, backgroundColor: COLORS.gray,
            ...containerStyle
        }}
            onPress={() => navigation.navigate("Market")}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>

        </TouchableOpacity>
    )
}

export default TextButton;