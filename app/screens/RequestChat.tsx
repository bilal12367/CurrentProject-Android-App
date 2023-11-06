import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StatusBarComponent from '../components/StatusBarComponent'
import { NavigationScreenProp } from 'react-navigation'
import { useLazyGetRequestDetailsQuery } from '../store/RTKQuery'
import ImageItem from '../components/ImageItem'
import { Colors, fonts } from '../constants/styles'
import { Avatar, Divider, IconButton } from 'react-native-paper'
import ProfileAvatar2 from '../components/ProfileAvatar2'
import Icon from 'react-native-vector-icons/AntDesign'


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
    const userIconSize = 25;
    useEffect(() => {
        if (respGetRequest.isUninitialized) {
            reqGetRequest(props.route.params.requestId)
        } else if (respGetRequest.isSuccess) {
            console.log('respGetRequest.data', respGetRequest.data)
        }
    }, [respGetRequest])
    return (
        <View>
            <StatusBarComponent barStyle='dark-content' />
            {/* <Text>{JSON.stringify(props.route.params.requestId)}</Text> */}
            {
                respGetRequest.isSuccess &&
                <View style={{ paddingHorizontal: 14, paddingVertical: 10, elevation: 5, backgroundColor: 'white' }}>
                    {/* <Text>{JSON.stringify(respGetRequest.data._id)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.requested_user_id)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.requested_to_user)}</Text>
                        <Text>{JSON.stringify(respGetRequest.data.org_id)}</Text> */}
                    <SafeAreaView>
                        {
                            respGetRequest.isSuccess &&
                            <>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 44, width: 44, borderRadius: 10, overflow: 'hidden', elevation: 10, shadowOffset: { height: 4, width: 4 }, shadowColor: Colors.pallette3.primary, borderWidth: 2, borderColor: Colors.pallette3.primary }}>
                                        <ImageItem fileId={respGetRequest.data.org_id.logo} />
                                    </View>
                                    <View style={{ marginLeft: 14 }}>
                                        <Text style={[fonts.head2]} >{respGetRequest.data.org_id.name}</Text>
                                        <Text >{respGetRequest.data.org_id.desc}</Text>
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
                                    <Icon size={30} style={{ marginHorizontal: 10 }} color={'#b8b8b8'} name='swap' />
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
            }
        </View>
    )
}

export default RequestChat

const styles = StyleSheet.create({})