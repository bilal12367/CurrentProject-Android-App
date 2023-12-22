import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGetMessagesQuery, useLazyGetMessagesQuery, useSendMessageMutation } from '../store/RTKQuery'
import { DiscordPageState, Group, IMessage } from '../utils'
import { actions, useAppDispatch, useAppSelector } from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/styles'
import PressableComponent from './PressableComponent'
import { MutationTypes } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import ImageItem from './ImageItem'
import ChatMessageItem from './ChatMessageItem'
import { useRoomHook } from '../hooks/useRoomHook'


interface ChatPageProps {
    group: Group,
    pageActions: {
        openDrawer: () => void,
        closeDrawer: () => void,
        openDetails: () => void,
        closeDetails: () => void,
    }
}

interface MessageView {
    from: String,
    messages: IMessage[]
}

const ChatPage = (props: ChatPageProps) => {
    const scrollRef = useRef()
    // const msgResp = useGetMessagesQuery(props.group._id)
    // const messageList = useAppSelector((state) => state.dataReducer.messages)
    const roomProvider = useRoomHook({ roomId: props.group._id })
    const [messageViewList, setMessageViewList] = useState<MessageView[]>([]);
    const [sendMessageReq, sendMessageResp] = useSendMessageMutation()
    const [message, setMessage] = useState<string>('');
    const pageState = useAppSelector((state) => state.reducer.discordPageState)

    useEffect(() => {
        if (roomProvider.messageList.length != 0) {
            let temp = roomProvider.messageList[0].from
            let arr: MessageView[] = []
            let obj: any = {
                from: temp,
                messages: []
            }
            roomProvider.messageList.forEach((message: IMessage, index: Number) => {
                if (temp == message.from) {
                    obj.from = message.from
                    obj.messages.push(message)
                } else {
                    arr.push(obj)
                    temp = message.from
                    obj = {
                        from: message.from,
                        messages: [message]
                    }
                }
                if (index == roomProvider.messageList.length - 1) {
                    arr.push(obj)
                }
            })
            setMessageViewList(arr);
        } else {
            setMessageViewList([])
        }
    }, [roomProvider.messageList])

    useEffect(() => {
        // msgResp.refetch()
        // if (msgResp.isUninitialized) {
        //     msgReq(props.group._id)
        // }
    }, [props])

    useEffect(()=>{
        console.log('sendMessageResp', JSON.stringify(sendMessageResp))
        if(sendMessageResp.isSuccess){
            console.log('sendMessageResp.data', sendMessageResp.data)
        }
    },[sendMessageResp])

    const logMessages = (messages: IMessage[]) => {
        let temp: String[] = []
        messages.forEach((message: IMessage) => {
            temp.push(message.message)
        })
    }

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
            <ScrollView onContentSizeChange={() => {
                scrollRef.current.scrollToEnd({ animated: true })
            }} ref={scrollRef as any} bounces={true} style={{ flexGrow: 1, display: 'flex', margin: 8 }}>
                {
                    roomProvider.isSuccess &&
                    Object.values(messageViewList).map((item: MessageView, index: number) => {
                        return <ChatMessageItem key={item.messages[0]._id} messages={item.messages} userId={item.from} />
                    })
                }
                {/* {
                    msgResp.isSuccess &&
                    Object.values(messageList).map((message: IMessage, index: number) => {
                        let showProfile = true
                        if (index != 0) {
                            if (message.from == messageList[index - 1].from) {
                                showProfile = false
                            } else {
                                showProfile = true
                            }
                        } else {
                            showProfile = true
                        }
                        return (
                            <>
                                <View key={message._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: messageList.length - 1 == index ? 10 : 0, borderRadius: 14 }}>
                                    <View style={{ width: 50 }}>
                                        <View>
                                            {
                                                showProfile &&
                                                <ProfileAvatar size={35} userName='' userId={message.from} />
                                            }
                                        </View>
                                    </View>
                                    <Text>{message.message}</Text>
                                </View>
                            </>
                        )
                    })
                } */}
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