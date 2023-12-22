import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { MutableRefObject, useEffect, useState } from 'react'
import PressableComponent from './PressableComponent'
import { useSendMessageMutation } from '../store/RTKQuery'
import { Group } from '../utils'
import { Colors } from '../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSocket } from '../context/SocketContext'


interface MessageSenderProps {
    groupId?: string,
    requestId?: string,
    scrollRef: MutableRefObject<undefined>
}

const MessageSender = (props: MessageSenderProps) => {
    const { getSocket } = useSocket();
    const socket = getSocket();
    const [sendMessageReq, sendMessageResp] = useSendMessageMutation()
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            props.scrollRef.current.scrollToEnd({ animated: true })
        });
        return () => {
            showSubscription.remove();
        }
    }, [])

    useEffect(()=>{
        console.log('sendMessageResp', sendMessageResp)
        if(sendMessageResp.isSuccess) {
            console.log("Message Sent: ", sendMessageResp.data)
        }
    },[sendMessageResp])

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', elevation: 2, paddingVertical: 14, paddingHorizontal: 8, borderTopColor: '#ebebeb' }}>
            <TextInput onChangeText={(newText: string) => { setMessage(newText) }} value={message} style={{ backgroundColor: '#ebebeb', flexGrow: 1, paddingHorizontal: 14, marginHorizontal: 3, borderColor: '#d4d4d4', borderWidth: 2, borderRadius: 100 }} multiline={true} />
            {
                message.length != 0 &&
                <PressableComponent onClick={() => {
                    if (props.groupId != undefined) {
                        sendMessageReq({ groupId: props.groupId, message: message, files: [] })
                        // socket.emit("message_room", { roomId: props.groupId, message: message })

                    } else if (props.requestId != undefined) {
                        sendMessageReq({ requestId: props.requestId, message: message, files: [] })
                        // socket.emit("message_room", { roomId: props.requestId, message: message })

                    }
                    setMessage('')
                }} foreground={true} rippleColor='light' style={{ padding: 12, marginHorizontal: 3, backgroundColor: Colors.pallette3.primary, borderRadius: 100 }} >
                    <Icon name='send' color={'white'} size={24} />
                </PressableComponent>
            }
        </View>
    )
}

export default MessageSender

const styles = StyleSheet.create({})