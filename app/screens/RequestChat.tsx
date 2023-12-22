import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StatusBarComponent from '../components/StatusBarComponent'
import { NavigationScreenProp } from 'react-navigation'
import { useLazyGetRequestChatQuery, useLazyGetRequestDetailsQuery } from '../store/RTKQuery'
import ImageItem from '../components/ImageItem'
import { Colors, fonts } from '../constants/styles'
import { Avatar, Button, Divider, IconButton, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper'
import ProfileAvatar2 from '../components/ProfileAvatar2'
import Icon from 'react-native-vector-icons/AntDesign'
import PressableComponent from '../components/PressableComponent'
import MessageSender from '../components/MessageSender'
import { IMessage } from '../utils'
import ButtonPressable from '../components/ButtonPressable'
import { useSocket } from '../context/SocketContext'
import { useRoomHook } from '../hooks/useRoomHook'


interface RequestChatProps {
    route: {
        key: string,
        name: string,
        params: {
            requestId: string
        }
    }
    navigation: NavigationScreenProp
}

const RequestChat = (props: RequestChatProps) => {
    const [reqGetRequest, respGetRequest, lastResp] = useLazyGetRequestDetailsQuery()
    const roomHook = useRoomHook({ roomId: props.route.params.requestId });
    const [showModal, setShowModal] = useState(false);
    const dW = Dimensions.get('screen').width;
    const scrollRef = useRef();
    const userIconSize = 25;
    useEffect(() => {
        if (respGetRequest.isUninitialized) {
            reqGetRequest(props.route.params.requestId)
        } else if (respGetRequest.isSuccess) {
            // console.log('respGetRequest.data', respGetRequest.data)
        }
    }, [respGetRequest])


    const takeAction = () => {
        setShowModal(true);
    }

    const approveRequest = () => {

    }

    const rejectRequest = () => {

    }

    return (
        <PaperProvider>
            <View>
                <StatusBarComponent barStyle='dark-content' />
                {
                    respGetRequest.isSuccess &&
                    <View style={{ display: 'flex', height: '100%' }}>
                        <Portal>
                            <Modal visible={showModal} onDismiss={() => { setShowModal(false) }} contentContainerStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: 'white', width: dW * 0.76, padding: 14, borderRadius: 10 }}>
                                    <View>
                                        <Text>Take Action on the Request</Text>
                                        <Divider style={{ marginVertical: 10 }} />
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <ButtonPressable backgroundColor={Colors.pallette3.primary} onPress={approveRequest} text='Approve Request' />
                                            <ButtonPressable backgroundColor={'red'} onPress={rejectRequest} text='Reject Request' />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </Portal>

                        <View style={{ paddingHorizontal: 14, paddingVertical: 10, elevation: 5, backgroundColor: 'white' }}>
                            {/* <Text>{JSON.stringify(respGetRequest.data._id)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.requested_user_id)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.requested_to_user)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.org_id)}</Text> */}
                            <SafeAreaView>
                                {
                                    respGetRequest.isSuccess &&
                                    <>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ height: 44, width: 44, borderRadius: 10, overflow: 'hidden', elevation: 10, shadowOffset: { height: 4, width: 4 }, shadowColor: Colors.pallette3.primary, borderWidth: 2, borderColor: Colors.pallette3.primary }}>
                                                    <ImageItem fileId={respGetRequest.data.org_id.logo} />
                                                </View>
                                                <View style={{ marginLeft: 14 }}>
                                                    <Text style={[fonts.head2]} >{respGetRequest.data.org_id.name}</Text>
                                                    <Text >{respGetRequest.data.org_id.desc}</Text>
                                                </View>
                                            </View>

                                            <View>
                                                <Button onPress={takeAction} textColor='black' style={{ borderRadius: 5 }} mode='text'>Take Action</Button>
                                            </View>
                                        </View>
                                        <Divider style={{ marginVertical: 14 }} />
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                            {
                                                respGetRequest.data.requested_user_id.profilePic == null ?
                                                    <Avatar.Text size={userIconSize} label={respGetRequest.data.requested_user_id.name[0].toUpperCase()} />
                                                    :
                                                    <View style={{ height: userIconSize, width: userIconSize }}>
                                                        <ImageItem fileId={respGetRequest.data.requested_user_id.profilePic} />
                                                    </View>
                                            }
                                            <Icon size={20} style={{ marginHorizontal: 6 }} color={'#b8b8b8'} name='swap' />
                                            {
                                                respGetRequest.data.requested_to_user.profilePic == null ?
                                                    <Avatar.Text size={userIconSize} label={respGetRequest.data.requested_to_user.name[0].toUpperCase()} />
                                                    :
                                                    <View style={{ height: userIconSize, width: userIconSize, borderRadius: 100, overflow: 'hidden' }}>
                                                        <ImageItem fileId={respGetRequest.data.requested_to_user.profilePic} />
                                                    </View>
                                            }
                                            <View style={{ marginLeft: 14 }}>
                                                {
                                                    respGetRequest.data.role == "Requested_Admin" ?
                                                        <Text>You've been requested by {respGetRequest.data.requested_user_id.name}</Text>
                                                        :
                                                        <Text>You've Requested to {respGetRequest.data.requested_to_user.name}</Text>
                                                }
                                            </View>
                                        </View>
                                    </>
                                }
                            </SafeAreaView>


                        </View>
                        <ScrollView bounces={true} ref={scrollRef as any} onContentSizeChange={() => {
                            scrollRef.current.scrollToEnd({ animated: true })
                        }} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 14 }}>
                            {
                                roomHook.isSuccess &&
                                Object.values(roomHook.messageList as IMessage[]).map((message: IMessage) => {
                                    let self: boolean = roomHook.user == message.from;
                                    return (
                                        <View key={message._id} style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: self ? "flex-end" : "flex-start", marginVertical: 4 }}>
                                            <View style={{ backgroundColor: self ? Colors.pallette3.light1 : Colors.pallette3.primary, padding: 8, borderRadius: 10 }}>
                                                <Text style={{ display: 'flex', color: self ? 'black' : 'white' }}>{message.message}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                        <MessageSender requestId={props.route.params.requestId} scrollRef={scrollRef} />

                    </View>
                }
            </View>
        </PaperProvider>
    )
}

export default RequestChat

const styles = StyleSheet.create({})