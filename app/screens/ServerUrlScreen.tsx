import { ActivityIndicator, View, Text, StatusBar, StyleSheet, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native'
import React, { useState } from 'react'
import { Colors, s } from '../constants/styles'
import { Button, Icon, Input } from '@rneui/themed'
import PressableComponent from '../components/PressableComponent'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { Screens } from '../utils'


const ServerUrlScreen = ({ navigation }) => {
    const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const dispatch = useDispatch();
    const [server_url_input, setServerUrlInput] = useState('')
    // const [serverUrl, setServerUrl] = React.useState('')
    const styles = StyleSheet.create({
        cont1: {
            paddingHorizontal: 14,
            marginVertical: 10,
        },
        alignCenter: {
            display: 'flex', alignItems: 'center'
        },
        mt5: {
            marginVertical: 8
        }
    })

    const connectToUrl = async () => {
        setLoadingState('loading')
        await axios.post("https://" + server_url_input + ".loca.lt/testPost").then(res => {
            setLoadingState('success')
            if (res.data.success == 1) {
                
                navigation.replace(Screens.LOGIN)
            }
        }).catch((e) => {
            setLoadingState('error')
        })
    }
    return (
        <View style={[s.fHW, styles.cont1]}>

            {/* <StatusBar backgroundColor={Colors.pallette3.light1} animated={true} barStyle={'dark-content'} /> */}
            <SafeAreaView>
                <View style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <View>
                        <View style={styles.mt5}>
                            <Text style={[s.head1, { color: Colors.pallette3.primary }]}>Server Phrase</Text>
                        </View>
                        <View style={styles.mt5}>
                            <TextInput mode='outlined' label='Enter Server Phrase' onChangeText={newText => setServerUrlInput(newText)} />
                            <View style={{ padding: 5, paddingHorizontal: 10, marginTop: 10, backgroundColor: Colors.pallette3.light2, borderRadius: 8, borderColor: Colors.pallette3.primary, borderWidth: 1 }}>
                                <Text style={{ color: Colors.pallette3.primary }}>This is provided by the developer.</Text>
                                <Text style={{ color: Colors.pallette3.primary }}>Contact Your Developer to get the phrase.</Text>
                            </View>
                        </View>
                        {/* {
                            loadingState == 'success' && <View style={[styles.mt5]}>
                                <Icon name='check-circle' size={80} color={Colors.success} />
                                <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Text style={[s.head2, { fontWeight: 'bold', color: Colors.success }]}>Success</Text>
                                </View>
                            </View>
                        } */}

                    </View>
                    <View style={[{ marginBottom: 20 }]} >
                        {
                            loadingState == 'idle' ? <PressableComponent onClick={connectToUrl} style={[{ padding: 14, backgroundColor: Colors.pallette3.primary, borderRadius: 5 }, styles.alignCenter]}>
                                <Text style={[Colors.whiteText, { fontWeight: 'bold', fontSize: 16 }]}>Connect</Text>
                            </PressableComponent> : <ActivityIndicator size={40} color={Colors.pallette3.primary} />
                        }


                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ServerUrlScreen