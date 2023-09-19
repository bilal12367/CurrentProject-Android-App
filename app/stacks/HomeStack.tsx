import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/DashboardScreen'
import CreateOrganization from '../screens/CreateOrganization'
import Profile from '../screens/Profile'
import DashboardScreen2 from '../screens/DashboardScreen2'
import Chat from '../screens/Chat'

export const HomeRoutes = {
    Dashboard: 'Dashboard',
    CreateOrg: 'CreateOrg',
    Profile: 'Profile',
    Chat: 'Chat'
}
const HomeStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={HomeRoutes.Dashboard} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HomeRoutes.Dashboard} component={DashboardScreen2} />
            <Stack.Screen name={HomeRoutes.CreateOrg} component={CreateOrganization} />
            <Stack.Screen name={HomeRoutes.Profile} component={Profile} />
            <Stack.Screen name={HomeRoutes.Chat} component={Chat} />
        </Stack.Navigator>
    )
}

export default HomeStack