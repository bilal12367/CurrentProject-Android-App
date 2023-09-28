import { Image, View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Button } from 'react-native-paper'
import { Colors } from '../constants/styles'
import DocumentPicker from 'react-native-document-picker'
import { useGetMyDetailsMutation, useGetProfilePicMutation, useUploadFileMutation } from '../store/RTKQuery'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { actions, useAppDispatch } from '../store'
import { LoadingState } from '../store/Slice'
import ProfileAvatar from '../components/ProfileAvatar'
import KeyChain from 'react-native-keychain'
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native'
import { AppRoutes } from '../router/AppRouter'
import { Screens } from '../utils'
import { HomeRoutes } from '../stacks/HomeStack'

const Profile = (navigation) => {
    const [uploadFileReq, uploadFileRes] = useUploadFileMutation();
    const [getProfileReq, getProfileResp] = useGetProfilePicMutation({});
    const [getMyDetailsReq, getMyDetailsResp] = useGetMyDetailsMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (getMyDetailsResp.isUninitialized) {
            getMyDetailsReq({})
        }
    }, [getMyDetailsResp])

    useEffect(() => {
    }, [uploadFileRes])
    const pickImage = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
            // allowMultiSelection: true
        })
        const formData = new FormData();
        res.forEach((file) => {
            formData.append('files[]', { uri: file.uri, name: file.name, type: file.type });
        })
        uploadFileReq(formData)
        setTimeout(() => {
            getProfileReq({})
        }, 2000)


    }
    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await KeyChain.resetGenericPassword()
        dispatch(actions.slice1.setUserLogState(LoadingState.false))
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 60, position: 'relative' }}>
                    {
                        getMyDetailsResp.isSuccess && <ProfileAvatar userName={getMyDetailsResp.data.name} showEdit={true} size={130} />
                    }
                    {/* <View style={{ position: 'relative' }}>
                        {
                            getProfileResp.isUninitialized && <Avatar.Image size={160} source={require('../../assets/images/person.png')} />
                        }
                        {
                            getProfileResp.isSuccess && <Avatar.Image size={160} source={{ uri: getProfileResp.data.file }} />
                        }
                        <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                            <Pressable onPress={pickImage} android_ripple={{ color: 'rgba(0,0,0,0.4)', foreground: true }} style={{ borderRadius: 100, overflow: 'hidden', backgroundColor: 'red' }}>
                                <View style={{ padding: 4, backgroundColor: 'white' }}>
                                    <Avatar.Icon size={30} icon={'pencil'} />
                                </View>
                            </Pressable>
                        </View>
                    </View> */}
                </View>
                <View style={{ marginTop: 40, paddingHorizontal: 30 }}>
                    <Button onPress={logout} mode='contained'>Logout</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile