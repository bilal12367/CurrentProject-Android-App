import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'

interface StatusBarProps {
    type: 'Home' | 'Normal',
    barStyle: 'light-content' | 'dark-content'
}

const StatusBarComponent = ({ type, barStyle }: StatusBarProps) => {
    return (
        <StatusBar backgroundColor='transparent' translucent={true} animated={true} barStyle={barStyle} />
        // <></>
    )
}

export default StatusBarComponent