import { View, Text, Image, StyleProp, ImageStyle, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { useGetImageQuery } from '../store/RTKQuery'

interface ImageItemProps {
    fileId: string
}

const ImageItem = ({ fileId  }: ImageItemProps) => {
    const imageResp = useGetImageQuery(fileId);
    return (
        <>
            {
                imageResp.isSuccess &&
                <Image style={{height: '100%',width: '100%'}} source={{ uri: imageResp.data.file }} />
            }
        </>
    )
}

export default ImageItem
