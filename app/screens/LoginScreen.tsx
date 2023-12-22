import { ActivityIndicator, View, Text, StatusBar, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, s } from '../constants/styles'
import PressableComponent from '../components/PressableComponent'
import StatusBarComponent from '../components/StatusBarComponent'
import InfoBoxComponent from '../components/InfoBoxComponent'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screens, validateEmail, validatePassword } from '../utils'
import { useSocket } from '../context/SocketContext'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { actions, useAppDispatch, useAppSelector } from '../store'
import { useLoginMutation } from '../store/RTKQuery'
import { LoadingState } from '../store/Slice'
import { AuthErrorTypes, ErrorType, GeneralErrorTypes } from '../utils/errors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface WelcomeScreenProp {
    navigation: NativeStackNavigationProp<{}>
}
const LoginScreen = ({ navigation }: WelcomeScreenProp) => {
    const [username, setUserName] = useState('')
    const [loginReq, loginResp] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [formValue, setFormValue] = useState({
        email: 'sk.bilal.md@gmail.com',
        password: 'Test!321',
        formValid: false
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })
    const styles = StyleSheet.create({
        mt5: {
            marginVertical: 8
        },
        alignCenter: {
            display: 'flex', alignItems: 'center'
        },
    })

    useEffect(() => {
        if (loginResp.isSuccess) {
            dispatch(actions.slice1.setUserLogState(LoadingState.true))
        } else {
            setFormErrors({...formErrors, password: "Invalid Email or Password"})
        }
    }, [loginResp])

    const navigateToRegister = () => {
        navigation.navigate(Screens.REGISTER)
    }


    const handleChange = (field: string, newText: string) => {
        setFormErrors({ ...formErrors, [field]: '' })
        setFormValue({ ...formValue, [field]: newText })
    }

    const loginUser = () => {
        let _formValue: any = formValue;
        // call login req
        loginReq(_formValue)
    }

    return (
        <View style={{ height: '100%' }}>
            {/* <StatusBar barStyle='light-content' /> */}
            <StatusBarComponent type='Normal' barStyle='light-content' />
            <ImageBackground style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('../../assets/images/loginback1.png')} >
                <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[s.head1, { color: Colors.white, letterSpacing: 3, fontFamily: 'Rajdhani-Bold' }]}>Login</Text>

                    <Image style={{ marginTop: 14, height: 160, width: 100 }} resizeMode='contain' source={require('../../assets/images/login_illus1.png')} />
                </View>
            </ImageBackground>
            <View style={{ padding: 14, display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                <View>
                    {/* <Text style={[s.head1, { color: Colors.pallette3.primary, fontFamily: 'Rajdhani-Bold' }]}>Login</Text> */}
                    <View style={{ marginVertical: 30 }}>
                        <TextInput keyboardType='email-address' error={formErrors.email != '' ? true : false} value={formValue.email} left={<TextInput.Icon icon='email' iconColor={Colors.pallette3.primary} />} onChangeText={newText => handleChange('email', newText)} label='Email' placeholder='Enter Email' mode='outlined' style={{ marginVertical: 5 }} outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} />
                        {formErrors.email != '' && <HelperText type='error'>{formErrors.email}</HelperText>}
                        {/* <TextInput error={formErrors.password != '' ? true : false} left={<TextInput.Icon onPress={toggleShowPassword} icon={formState.showPassword ? 'eye-off' : 'eye'} iconColor={Colors.pallette3.primary} />} onChangeText={newText => handleFormChange('password', newText)} value={formValue.password} secureTextEntry={!formState.showPassword} style={{ marginVertical: 5 }} mode='outlined' label='Enter Password' outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} /> */}
                        <TextInput error={formErrors.password != '' ? true : false} value={formValue.password} left={<TextInput.Icon icon={'eye'} iconColor={Colors.pallette3.primary} />} onChangeText={newText => handleChange('password', newText)} secureTextEntry={true} style={{ marginVertical: 5 }} mode='outlined' label='Enter Password' outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} />
                        {formErrors.password != '' && <HelperText type='error'>{formErrors.password}</HelperText>}
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button rippleColor={Colors.rippleColor} mode='text' style={{ borderRadius: 5, marginTop: 10 }} onPress={navigateToRegister} labelStyle={{ color: Colors.pallette3.secondary }}>Don't have an account ?? Register.</Button>
                        </View>
                    </View>

                    {/* <InfoBoxComponent messages='This will be your username for this session.' type='info'/> */}
                </View>


                <View style={[{ marginVertical: 0 }, styles.mt5]} >

                    {/* {
                        loadingState == 'idle' ? <PressableComponent onClick={() => { }} style={[{ padding: 14, backgroundColor: Colors.pallette3.primary, borderRadius: 5 }, styles.alignCenter]}>
                            <Text style={[Colors.whiteText, { fontWeight: 'bold', fontSize: 16 }]}>Start Chatting</Text>
                        </PressableComponent> : <ActivityIndicator size={40} color={Colors.pallette3.primary} />
                    } */}

                    <Button onPress={loginUser} buttonColor={Colors.pallette3.primary} rippleColor={Colors.rippleColor} style={{ borderRadius: 5 }} mode='contained'>Login</Button>
                </View>
            </View>

        </View>
    )
}

export default LoginScreen