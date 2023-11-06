import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IFile } from '../utils'
import { Image } from 'react-native'
import { useUploadFile2Mutation } from '../store/RTKQuery'
import { Avatar, ProgressBar } from 'react-native-paper'
import { Colors } from '../constants/styles'
import PressableComponent from './PressableComponent'

interface FileUploadItemProps {
    file: IFile,
    uploadCallback: (data: any) => void
}

const FileUploadItem = ({ file, uploadCallback = () => { } }: FileUploadItemProps) => {
    const [uploadFileReq, uploadFileResp] = useUploadFile2Mutation();
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (uploadFileResp.isUninitialized) {
            uploadFileReq({ url: '/uploadFile', data: file, setProgress })
        }
        if (uploadFileResp.isSuccess) {
            uploadCallback(uploadFileResp.data.data)
        }
    }, [uploadFileResp])

    return (
        <View style={{ marginRight: 10, marginBottom: 10, position: 'relative' }} key={file.uri}>
            <Image style={{ height: 80, width: 80 }} source={{ uri: file.uri }} />
            <ProgressBar color={Colors.pallette3.success} progress={progress} />
            {
                uploadFileResp.isError &&
                <PressableComponent onClick={() => { uploadFileResp.reset() }} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View >
                        <Avatar.Icon style={{ backgroundColor: 'transparent' }} color='red' icon={'alert-circle'} />
                    </View>
                </PressableComponent>
            }

        </View>
    )
}

export default FileUploadItem