import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServerUrlScreen from '../screens/ServerUrlScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { SocketProvider } from '../context/SocketContext';
import DashboardScreen from '../screens/DashboardScreen';
import { Screens } from '../utils';


const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName={Screens.REGISTER} screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name='Home' component={HomeScreen} options={{ presentation: 'fullScreenModal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} /> */}
            {/* <Stack.Screen name='Server_Url' component={ServerUrlScreen} options={{ presentation: 'fullScreenModal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} /> */}
            <Stack.Screen name={Screens.LOGIN} component={LoginScreen} options={{ presentation: 'fullScreenModal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />
            <Stack.Screen name={Screens.REGISTER} component={RegisterScreen} options={{ presentation: 'fullScreenModal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />
            

        </Stack.Navigator>
    )
}

export default AuthStack