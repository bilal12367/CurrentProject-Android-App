import { View, Text, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import PressableComponent from './PressableComponent'
import LinearGradient from 'react-native-linear-gradient'

interface GradientCardComponentProp {
    children: React.ReactNode,
    colors?: (string | number)[],
    start?: { x: number, y: number },
    end?: { x: number, y: number },
    borderRadius?: number,
    onClick?: () => void
}

const GradientCardComponent = ({ children, onClick = () => { }, colors = ['#C6ACFD', '#9DA7FF'], start = { x: 0, y: 0 }, end = { x: 1, y: 0 }, borderRadius = 10 }: GradientCardComponentProp) => {
    return (
        <Shadow distance={7} offset={[0, 7]} style={{ width: '100%', marginBottom: 20 }}>
            <LinearGradient style={{
                width: '100%', borderRadius: 14,
            }} end={end} start={start} colors={colors}>
                <PressableComponent rippleColor='light' foreground={true} style={{ borderRadius: borderRadius, overflow: 'hidden' }} onClick={onClick} >
                    <View style={{ width: '100%' }}>
                        {children}
                    </View>
                </PressableComponent>
            </LinearGradient>
        </Shadow>
    )
}

export default GradientCardComponent