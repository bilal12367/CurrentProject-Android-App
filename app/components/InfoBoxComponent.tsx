import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'

interface InfoBoxProps {
    messages: string,
    type: 'success' | 'error' | 'warning' | 'info'
}

const InfoBoxComponent = ({ messages, type }: InfoBoxProps) => {
    const styles = StyleSheet.create({
        successBox: {
            backgroundColor: Colors.infoBox.successLight,
            borderColor: Colors.infoBox.success,
            color: Colors.infoBox.success
        },
        warningBox: {
            backgroundColor: Colors.infoBox.warningLight,
            borderColor: Colors.infoBox.warning,
            color: Colors.infoBox.warning
        },
        errorBox: {
            backgroundColor: Colors.infoBox.errorLight,
            borderColor: Colors.infoBox.error,
            color: Colors.infoBox.error
        },
        infoBox: {
            backgroundColor: Colors.infoBox.infoLight,
            borderColor: Colors.infoBox.info,
            color: Colors.infoBox.info
        },
    })
    let contStyle = {}
    let textStyle = {}
    switch (type) {
        case 'success':
            contStyle = styles.successBox
            textStyle = { color: styles.successBox.color }
            break;
        case 'warning':
            contStyle = styles.warningBox
            textStyle = { color: styles.warningBox.color }
            break;
        case 'error':
            contStyle = styles.errorBox
            textStyle = { color: styles.errorBox.color }
            break;
        case 'info':
            contStyle = styles.infoBox
            textStyle = { color: styles.infoBox.color }
            break;
        default:
            break;
    }
    return (
        <View style={[contStyle, { width: '100%', padding: 14, borderRadius: 5, borderWidth: 1 }]}>
            <Text style={textStyle}>{messages}</Text>
        </View>
    )
}

export default InfoBoxComponent