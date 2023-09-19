import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Message } from '../utils'
import { Colors } from '../constants/styles'

const MessageItem = ({ message, userId }: { message: Message, userId: string }) => {
    const myMessage = (userId == message.from);
    const styles = StyleSheet.create({
        contLeft: {
            width: '100%',
            paddingHorizontal: 10,
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        contRight: {
            width: '100%',
            paddingHorizontal: 10,
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    })
    if (!myMessage) {
        return (
            <View style={styles.contLeft}>
                <View style={{ padding: 14, backgroundColor: Colors.pallette3.secondary, borderRadius: 10 }}>
                    <Text style={[Colors.whiteText]}>{message.message}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.contRight}>
                <View style={{ padding: 14, backgroundColor: 'white', borderRadius: 10 }}>
                    <Text style={Colors.blackText}>{message.message}</Text>
                </View>
            </View>
        )
    }
}

export default MessageItem