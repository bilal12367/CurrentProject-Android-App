
import { ToastAndroid, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CommonActions, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native'
import AppStack from '../stacks/AppStack'
import AuthStack from '../stacks/AuthStack'
import { useAuth } from '../context/AuthContext'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Test from '../screens/Test'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { actions, useAppDispatch, useAppSelector } from '../store'
import KeyChain from 'react-native-keychain'
import { LoadingState } from '../store/Slice'
import { Screens, loadFromAsyncStorage } from '../utils'
import WelcomeScreen from '../screens/WelcomeScreen'
import { ActivityIndicator, Text } from 'react-native-paper'
import StatusBarComponent from '../components/StatusBarComponent'

const Loader = () => {
    return <View style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <ActivityIndicator color='red' />
    </View>
}

export const AppRoutes = {
    AuthStack: 'AuthStack',
    AppStack: 'AppStack',
    Loader: 'Loader'
}
const AppRouter = () => {
    const [userState, setUserState] = useState<'loading' | 'loggedIn' | 'notLoggedIn'>('loading')
    const Stack = createNativeStackNavigator()
    const isLoggedIn = useAppSelector((state) => state.reducer.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        getCreds()
    }, [isLoggedIn])

    const getCreds = async () => {
        try {
            const creds = await KeyChain.getGenericPassword()
            if (creds) {
                dispatch(actions.slice1.setUserLogState(LoadingState.true))
            } else {
                dispatch(actions.slice1.setUserLogState(LoadingState.false))
                // navigation.navigate(AppRoutes.AuthStack)
            }
        } catch (error) {
            dispatch(actions.slice1.setUserLogState(LoadingState.false))
            console.log('error', error)
            // ToastAndroid.showWithGravity('Cannot Access Credentials!!', 2000, ToastAndroid.LONG)
        }
    }

    const SwitchNavigator = createSwitchNavigator(
        {
            AppStack: AppStack,
            AuthStack: AuthStack,
            Loader: WelcomeScreen
        },
        {
            initialRouteName: AppRoutes.Loader,

        }
    )

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AppRoutes.Loader}>
                {/* <SwitchNavigator /> */}
                {
                    isLoggedIn == LoadingState.true ?
                        <Stack.Screen name={AppRoutes.AppStack} component={AppStack} /> :
                        <Stack.Screen name={AppRoutes.AuthStack} component={AuthStack} />
                }
                {
                    isLoggedIn == LoadingState.loading &&
                        <Stack.Screen name={AppRoutes.Loader} component={WelcomeScreen} />
                }
            </Stack.Navigator>
        </View>
    )
}

export default AppRouter

// const AppRouter = () => {
//     const Stack = createNativeStackNavigator()
//     const isLoggedIn = useAppSelector((state) => state.reducer.isLoggedIn)
//     const dispatch = useAppDispatch();
//     useEffect(() => {
//         setTimeout(() => {
//             loadFromAsyncStorage(dispatch)
//         }, 1400)
//     }, [])
//     return (
//         <NavigationContainer>
//             {
//                 isLoggedIn == LoadingState.loading &&
//                 <Stack.Navigator initialRouteName={Screens.WELCOME} screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name={Screens.WELCOME} component={WelcomeScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
//                 </Stack.Navigator>
//             }
//             {
//                 isLoggedIn == LoadingState.true &&
//                 <AppStack />
//             }
//             {
//                 isLoggedIn == LoadingState.false &&
//                 <AuthStack />
//             }
//         </NavigationContainer>
//     )
// }

// export default AppRouter