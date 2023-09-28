import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/DashboardScreen';
import { SocketProvider } from '../context/SocketContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from '../components/DrawerComponent';
import CreateOrganization from '../screens/CreateOrganization';
import { Screens } from '../utils';
import Profile from '../screens/Profile';
import Test from '../screens/Test';
import HomeStack from './HomeStack';
import DashboardScreen2 from '../screens/DashboardScreen2';
import Chat from '../screens/Chat';



export const DrawerRoutes = {
    Home: 'Home',
    Chat: 'Chat'
}

const AppStack = () => {
    const Drawer = createDrawerNavigator();

    useEffect(() => {
    }, [])
    return (
        <Drawer.Navigator initialRouteName={'Home'} drawerContent={DrawerComponent} screenOptions={{ headerShown: false }}>
            {/* <Drawer.Screen name={'OrgPage'} component={Test1} /> */}
            {/* <Drawer.Screen name={Screens.DASHBOARD} component={DashboardScreen} />
            <Drawer.Screen name={Screens.CREATEORG} component={CreateOrganization} />
            <Drawer.Screen name={Screens.PROFILE} component={Profile} options={{ swipeEnabled: false, headerShown: false }} /> */
            }
            <Drawer.Screen name={DrawerRoutes.Home} component={HomeStack} />
            <Drawer.Screen name={DrawerRoutes.Chat} component={Chat} options={{swipeEnabled: false}} />
            {/* <Drawer.Group>
                <Drawer.Screen name={Screens.DASHBOARD} component={DashboardScreen2} />
                <Drawer.Screen name={Screens.PROFILE} component={Profile} options={{ swipeEnabled: false, headerShown: false }} />

            </Drawer.Group> */}
        </Drawer.Navigator>
    )
}

export default AppStack