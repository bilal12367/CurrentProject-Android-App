import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageItem from './ImageItem'
import { Avatar } from 'react-native-paper'
import { Colors } from '../constants/styles'

interface ProfileAvatar3Props {
    profilePic: string | null,
    name: string,
    size?: number
}

const ProfileAvatar3 = (props: ProfileAvatar3Props) => {
    if (props.size == undefined) {
        props.size = 30;
    }
    return (
        <>
            {
                props.profilePic != null ?
                    <View style={{ height: props.size, width: props.size, borderRadius: 100, overflow: 'hidden' }}>
                        <ImageItem fileId={props.profilePic} />
                    </View>
                    : <>
                        <View style={{ borderWidth: 2, borderColor: Colors.pallette3.primary, borderRadius: 100, padding: 2 }}>
                            <Avatar.Text style={{ backgroundColor: Colors.pallette3.primary }} color='white' size={props.size + 5} label={props.name[0].toUpperCase()} />
                        </View>
                    </>
            }
        </>
    )
}

export default ProfileAvatar3

const styles = StyleSheet.create({})