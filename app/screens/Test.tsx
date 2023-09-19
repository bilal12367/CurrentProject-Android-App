import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetAllUsersMutation, useRegisterMutation, useTestMutation } from '../store/RTKQuery'
import { Button } from 'react-native-paper'
import axios from 'axios'

const Test = () => {

    // const [testReq, testResp] = useTestMutation()
    const [getAllUsersReq, getAllUsersResp] = useGetAllUsersMutation();
    const [registerReq, registerResp] = useRegisterMutation()
    const [resp, setResp] = useState({})


    const register = async () => {
        registerReq({ name: 'bilal', email: 'user12503246@gmail.com', password: 'Test!321' })
    }

    const test = () => {
        getAllUsersReq({})
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Test Screen</Text>
                <Text>Resp: {JSON.stringify(registerResp)}</Text>
                <Text style={{ marginTop: 40, color: 'black' }}>Get All Resp: {JSON.stringify(getAllUsersResp)}</Text>
                <View style={{ width: '100%', paddingHorizontal: 14 }}>
                    <Button mode='contained' onPress={register} style={{ marginBottom: 30, borderRadius: 5 }}>
                        <Text>Register</Text>
                    </Button>
                    <Button mode='contained' onPress={test} style={{ marginBottom: 30, borderRadius: 5 }}>
                        <Text>Test</Text>
                    </Button>
                </View>
            </View >
        </ScrollView>
    )
}

export default Test