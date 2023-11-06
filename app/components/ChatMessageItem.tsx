import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { IMessage } from '../utils'
import { useGetImageQuery, useGetProfileImageQuery } from '../store/RTKQuery'
import { Colors } from '../constants/styles'

interface ChatMessageItemProps {
    messages: IMessage[],
    userId: String
}

const ChatMessageItem = ({ userId, messages = [] }: ChatMessageItemProps) => {
    const imageResp = useGetProfileImageQuery(userId)
    //imageResp.data.profileImage - base64 string for image
    //imageResp.data.userName - for username
    useEffect(() => {
        if (imageResp.isSuccess) {
            
        }
    }, [imageResp])
    return (
        <View style={{ display: 'flex', marginTop: 10 }}>
            {
                imageResp.isSuccess &&
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <View>
                        {
                            imageResp.data.profileImage != null ?
                                <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{ uri: imageResp.data.profileImage }} /> :
                                <View style={{ backgroundColor: Colors.pallette3.primaryLight, height: 40, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold',color: Colors.pallette3.primary }}>{imageResp.data.userName[0].toUpperCase()}</Text>
                                </View>
                        }
                    </View>
                    <View style={{ display: 'flex', flexGrow: 1, marginLeft: 14 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{imageResp.data.userName}</Text>
                        {
                            Object.values(messages).map((messageItem: IMessage) => {
                                return (<View key={messageItem._id}>
                                    <Text style={{ fontSize: 12 }}>{messageItem.message}</Text>
                                </View>)
                            })
                        }
                    </View>
                </View>
            }
        </View>
    )
}

export default ChatMessageItem