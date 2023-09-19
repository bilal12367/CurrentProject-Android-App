import { Image, View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useGetProfilePicMutation, useUploadFileMutation } from '../store/RTKQuery'
import { Skeleton } from '@rneui/base'
import { Avatar } from 'react-native-paper'
import DocumentPicker from 'react-native-document-picker'
import { Colors } from '../constants/styles'

interface ProfileAvatarProps {
    userId?: string,
    showEdit?: boolean,
    size: number,
    userName: string
}

const ProfileAvatar = ({ userId, showEdit = false, size, userName }: ProfileAvatarProps) => {
    const [getProfileReq, getProfileRes] = useGetProfilePicMutation();
    const [uploadFileReq, uploadFileRes] = useUploadFileMutation();
    useEffect(() => {
        if (getProfileRes.isUninitialized) {
            if (userId) {
                getProfileReq({ userId })
            } else {
                getProfileReq({})
            }
        }
    }, [getProfileRes])

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

    return (
        <View style={{ borderRadius: 100, borderColor: Colors.pallette3.primaryLight, borderWidth: 2, padding: 4 }}>
            <View style={{ position: 'relative', borderRadius: 100, borderColor: Colors.pallette3.primaryTint1, borderWidth: 3, padding: 3 }}>
                {
                    getProfileRes.isLoading &&
                    <Skeleton style={{ borderRadius: 100 }} width={size} height={size}></Skeleton>
                }
                {
                    getProfileRes.isSuccess &&
                    <>
                        <Avatar.Image size={size} source={{ uri: getProfileRes.data.file }} />
                        {
                            showEdit && <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                                <Pressable onPress={pickImage} android_ripple={{ color: 'rgba(0,0,0,0.4)', foreground: true }} style={{ borderRadius: 100, overflow: 'hidden', backgroundColor: 'red' }}>
                                    <View style={{ padding: 4, backgroundColor: 'white' }}>
                                        <Avatar.Icon size={30} icon={'pencil'} />
                                    </View>
                                </Pressable>
                            </View>
                        }
                    </>
                }
                {
                    getProfileRes.isError &&
                    <><Avatar.Text label={userName[0]} size={size} />
                        {
                            showEdit && <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                                <Pressable onPress={pickImage} android_ripple={{ color: 'rgba(0,0,0,0.4)', foreground: true }} style={{ borderRadius: 100, overflow: 'hidden', backgroundColor: 'red' }}>
                                    <View style={{ padding: 4, backgroundColor: 'white' }}>
                                        <Avatar.Icon size={30} icon={'pencil'} />
                                    </View>
                                </Pressable>
                            </View>
                        }
                    </>
                }

            </View>
        </View>
    )
}

export default ProfileAvatar