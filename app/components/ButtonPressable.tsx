import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'
import { StyleProps } from 'react-native-reanimated'

interface ButtonPressableProps {
    onPress?: () => void,
    ripple_color?: 'dark' | 'white',
    text: string,
    backgroundColor?: string,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<ViewStyle>,
    disabled?: boolean
}

const ButtonPressable = ({ disabled = false, onPress = () => { }, ripple_color = 'dark', backgroundColor = Colors.pallette3.primary, text, buttonStyle = {}, textStyle = {} }: ButtonPressableProps) => {
    let rip_color = ''
    let opacity = 1
    if (disabled) opacity = 0.6
    if (ripple_color == 'dark') {
        rip_color = 'rgba(0,0,0,0.1)'
    } else {
        rip_color = 'rgba(255,255,255,0.2)'
    }
    return (
        <Pressable disabled={disabled} onPress={onPress} android_ripple={{ color: rip_color, foreground: true }} style={[{ backgroundColor: backgroundColor, opacity: opacity, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 5 }, buttonStyle]}>
            <Text style={[{ color: 'white', fontWeight: 'bold' }, textStyle]}>{text}</Text>
        </Pressable>
    )
}

export default ButtonPressable