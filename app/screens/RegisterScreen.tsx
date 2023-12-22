import { Image, View, Text, StatusBar, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, s } from '../constants/styles'
import { TextInput, Button, ActivityIndicator, HelperText } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import InfoBoxComponent from '../components/InfoBoxComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Screens, loadFromAsyncStorage, validateEmail, validatePassword } from '../utils'
import StatusBarComponent from '../components/StatusBarComponent'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native'
import { useRegisterMutation } from '../store/RTKQuery'
import { actions, useAppDispatch } from '../store'
import { LoadingState } from '../store/Slice'
interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<{}>
}
const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [registerReq, registerResp] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (registerResp.isError) {
      setFormErrors({...formErrors, password: "Invalid Email or Password."})
    }
    if (registerResp.isSuccess) {
      // navigation.replace(Screens.HOME)
      dispatch(actions.slice1.setUserLogState(LoadingState.true))
    }
  }, [registerResp])
  const handleChange = (label: string, value: string) => {
    setFormState({ ...formState, [label]: value })
  }

  const registerUser = () => {
    registerReq(formState)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBarComponent type='Normal' barStyle='light-content' />
      <View style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <View>
          <ImageBackground style={{ height: 300 }} source={require('../../assets/images/loginback1.png')}>
            <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[s.head1, { color: Colors.white }]}>Register</Text>
              <Image resizeMode='contain' style={{ marginTop: 14, height: 180, width: 240 }} source={require('../../assets/images/register_illus1.png')} />
            </View>
          </ImageBackground>
          <View style={[{ padding: 14, display: 'flex', justifyContent: 'space-between', marginTop: 20 }]}>
            <View>
              <TextInput error={formErrors.name == '' ? false : true} onChangeText={(newText) => { handleChange('name', newText) }} value={formState.name} left={<TextInput.Icon icon='account' iconColor={Colors.pallette3.primary} />} style={{ marginVertical: 5 }} mode='outlined' label='Enter Full Name' outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} />
              {formErrors.name != '' && <HelperText type='error'>{formErrors.name}</HelperText>}
              <TextInput error={formErrors.email == '' ? false : true} onChangeText={(newText) => { handleChange('email', newText) }} value={formState.email} keyboardType='email-address' left={<TextInput.Icon icon='email' iconColor={Colors.pallette3.primary} />} style={{ marginVertical: 5 }} mode='outlined' label='Enter Email' outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} />
              {formErrors.email != '' && <HelperText type='error'>{formErrors.email}</HelperText>}
              <TextInput error={formErrors.password == '' ? false : true} onChangeText={(newText) => { handleChange('password', newText) }} value={formState.password} secureTextEntry={true} left={<TextInput.Icon icon={'eye'} iconColor={Colors.pallette3.primary} />} style={{ marginVertical: 5 }} mode='outlined' label='Enter Password' outlineColor={Colors.pallette3.light1} activeOutlineColor={Colors.pallette3.secondary} />
              {formErrors.password != '' && <HelperText type='error'>{formErrors.password}</HelperText>}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button onPress={() => { navigation.navigate(Screens.LOGIN) }} rippleColor={Colors.rippleColor} mode='text' style={{ borderRadius: 5, }} labelStyle={{ color: Colors.pallette3.secondary }}>Already have an account ?? Log In</Button>
              </View>

            </View>
          </View>
        </View>
        {
          registerResp.isLoading ? <ActivityIndicator color={Colors.pallette3.primary} size={50} style={{ marginBottom: 20 }} /> : <View style={{ paddingHorizontal: 14, marginBottom: 20 }}>
            <Text>{JSON.stringify(formState)}</Text>
            <Text>{JSON.stringify(formErrors)}</Text>
            <Button onPress={registerUser} buttonColor={Colors.pallette3.primary} rippleColor={Colors.rippleColor} style={{ borderRadius: 5 }} mode='contained'>Register</Button>
          </View>
        }

      </View>
    </ScrollView>
  )
}

export default RegisterScreen
