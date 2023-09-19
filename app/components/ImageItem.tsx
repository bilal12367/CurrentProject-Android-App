import { View, Text, Image, StyleProp, ImageStyle, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { useGetImageMutation } from '../store/RTKQuery'

interface ImageItemProps {
    fileId: string
}

const ImageItem = ({ fileId  }: ImageItemProps) => {
    const [getImageReq, getImageResp] = useGetImageMutation();
    useEffect(() => {
        if (getImageResp.isUninitialized) {
            getImageReq({ fileId })
        }

    }, [getImageResp])
    return (
        <>
            {
                getImageResp.isSuccess &&
                <Image style={{height: '100%',width: '100%'}} source={{ uri: getImageResp.data.file }} />
            }
        </>
    )
}

export default ImageItem
