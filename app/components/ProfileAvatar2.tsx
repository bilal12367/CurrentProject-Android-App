import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useGetProfileImageQuery } from '../store/RTKQuery'
import { Colors } from '../constants/styles'

interface ProfileAvatar2Props {
    userId?: String,
}

const ProfileAvatar2 = ({ userId = "" }: ProfileAvatar2Props) => {
    const imgResp = useGetProfileImageQuery(userId);

    useEffect(() => {
        if (imgResp.isSuccess) {
            console.log("Unique123 : ", imgResp.data.userName)
        }
    }, [imgResp])

    return (
        <View>
            {
                imgResp.isSuccess &&
                    imgResp.data.profileImage == null ?
                    <View style={{ borderWidth: 4, borderColor: Colors.pallette3.light1, borderRadius: 100 }}>
                        <View style={{ height: 40, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Colors.pallette3.primary, fontSize: 24, fontWeight: 'bold' }}>{String(imgResp.data.userName)[0].toUpperCase()}</Text>
                            
                        </View>
                    </View>
                    :
                    <View style={{ borderWidth: 4, borderColor: Colors.pallette3.light1, borderRadius: 100 }}>
                        {/* <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{ uri: imgResp.data.profileImage }} /> */}
                        <Text>{JSON.stringify(imgResp.data)}</Text>
                    </View> 
                    

            }
            {/* {
                imgResp.isSuccess &&
                (
                    imgResp.data.profilePic == null ? 
                    <Text>{JSON.stringify(imgResp.data.userName)}</Text> :
                    <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{ uri: imgResp.data.profileImage }} />
                )
            } */}
        </View>
    )
}

export default ProfileAvatar2