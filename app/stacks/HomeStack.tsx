import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/DashboardScreen'
import CreateOrganization from '../screens/CreateOrganization'
import Profile from '../screens/Profile'
import DashboardScreen2 from '../screens/DashboardScreen2'
import AppStack from './AppStack'
import Chat from '../screens/Chat'
import OrganizationDetails from '../screens/OrganizationDetails'
import RequestChat from '../screens/RequestChat'
import { SocketProvider } from '../context/SocketContext'

export const HomeRoutes = {
    Dashboard: 'Dashboard',
    CreateOrg: 'CreateOrg',
    Profile: 'Profile',
    Chat: 'Chat1',
    OrgDetails: 'OrgDetails',
    RequestChat: 'RequestChat'
}

const HomeStack = () => {
    const Stack = createStackNavigator()
    return (
        <SocketProvider>
            <Stack.Navigator initialRouteName={HomeRoutes.Dashboard} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={HomeRoutes.Dashboard} component={AppStack} />
                <Stack.Screen name={HomeRoutes.CreateOrg} component={CreateOrganization} />
                <Stack.Screen name={HomeRoutes.OrgDetails} component={OrganizationDetails} />
                <Stack.Screen name={HomeRoutes.Chat} component={Chat} />
                <Stack.Screen name={HomeRoutes.Profile} component={Profile} />
                <Stack.Screen name={HomeRoutes.RequestChat} component={RequestChat} />
            </Stack.Navigator>
        </SocketProvider>
    )
}

export default HomeStack