import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetMessagesQuery, useLazyGetMessagesQuery, useSendMessageMutation } from '../store/RTKQuery'
import { DiscordPageState, Group, IMessage } from '../utils'
import { actions, useAppDispatch, useAppSelector } from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/styles'
import PressableComponent from './PressableComponent'
import { MutationTypes } from '@reduxjs/toolkit/dist/query/endpointDefinitions'


interface ChatPageProps {
    group: Group,
    pageActions: {
        openDrawer: () => void,
        closeDrawer: () => void,
        openDetails: () => void,
        closeDetails: () => void,
    }
}

const ChatPage = (props: ChatPageProps) => {
    const [msgReq, msgResp, lastmsgResp] = useLazyGetMessagesQuery()
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [sendMessageReq, sendMessageResp] = useSendMessageMutation()
    const pageState = useAppSelector((state) => state.reducer.discordPageState)
    const [message, setMessage] = useState<string>('');
    useMemo(() => {
        if (lastmsgResp.lastArg != props.group._id) {
            console.log("Re-Rendered")
            msgReq(props.group._id, false)
        }
    }, [props])
    useEffect(() => {
        if (msgResp.isSuccess) {
            // console.log('msgResp.data', msgResp.data)
            setMessageList(msgResp.data)
        }
        if (sendMessageResp.isSuccess) {
            let newMessage = sendMessageResp.data as IMessage
            setMessageList([newMessage, ...messageList])
        }
    }, [msgResp, sendMessageResp, props])



    const styles = StyleSheet.create({
        header: {}
    })

    return (
        <View style={{ display: 'flex', height: '100%' }}>
            <View style={{ elevation: 10, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 8, alignItems: 'center' }}>
                        <IconButton onPress={() => {
                            if (pageState == DiscordPageState.Chat) {
                                props.pageActions.openDrawer()
                            } else {
                                props.pageActions.closeDrawer()
                            }
                        }} icon={'menu'} size={25} />
                        <Icon name='pound' color={'grey'} size={18} />
                        <Text style={{ marginLeft: 14, fontSize: 18 }}>{props.group.groupName}</Text>
                    </View>
                </SafeAreaView>
            </View>
            <ScrollView bounces={true} style={{ flexGrow: 1, display: 'flex' }}>
                {
                    msgResp.isSuccess &&
                    Object.values(messageList).map((message: IMessage, index: number) => {
                        return (
                            <>
                                <View key={message._id} style={{ padding: 14, marginBottom: messageList.length - 1 == index? 10: 0 , elevation: 6, borderRadius: 14, backgroundColor: 'white', marginTop: 14, marginHorizontal: 14 }}>
                                    <Text>{message.message}</Text>
                                </View>
                            </>
                        )
                    })
                }
            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', elevation: 2, paddingVertical: 14, paddingHorizontal: 8, borderTopColor: '#ebebeb' }}>
                <TextInput onChangeText={(newText: string) => { setMessage(newText) }} value={message} style={{ backgroundColor: '#ebebeb', flexGrow: 1, paddingHorizontal: 14, marginHorizontal: 3, borderColor: '#d4d4d4', borderWidth: 2, borderRadius: 100 }} multiline={true} />
                {
                    message.length != 0 &&
                    <PressableComponent onClick={() => {
                        sendMessageReq({ groupId: props.group._id, message: message, files: [] })
                        setMessage('')
                    }} foreground={true} rippleColor='light' style={{ padding: 12, marginHorizontal: 3, backgroundColor: Colors.pallette3.primary, borderRadius: 100 }} >
                        <Icon name='send' color={'white'} size={24} />
                    </PressableComponent>
                }
            </View>
        </View>
    )
}

export default ChatPage