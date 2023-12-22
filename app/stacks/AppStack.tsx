import { View, Text, UIManager, Platform, LayoutAnimation } from 'react-native'
import React, { useEffect } from 'react'
import Profile from '../screens/Profile';
import DashboardScreen2 from '../screens/DashboardScreen2';
import Chat from '../screens/Chat';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchOrganization from '../screens/SearchOrganization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors, fonts, s } from '../constants/styles';
import PressableComponent from '../components/PressableComponent';
import { CommonActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { HomeRoutes } from './HomeStack';
import Notification from '../screens/Notification';
import { SocketProvider } from '../context/SocketContext';



export const DrawerRoutes = {
    Home: 'Home',
    Chat: 'Chat'
}

export const RootBottomRoutes = {
    Home: 'Home',
    Search: 'Search',
    Notifications: 'Notifications',
    Chat: 'Chat',
    Profile: 'Profile'
}

export const RoutesConfig: any = {
    Home: {
        name: 'Home',
        activeIcon: 'home',
        inActiveIcon: 'home-outline',
    },
    Search: {
        name: 'Search',
        activeIcon: 'magnify',
        inActiveIcon: 'magnify'
    },
    Chat: {
        name: 'Chat',
        activeIcon: 'chat',
        inActiveIcon: 'chat-outline'
    },
    Notifications: {
        name: 'Notifications',
        activeIcon: 'bell',
        inActiveIcon: 'bell-outline'
    },
    Profile: {
        name: 'Profile',
        activeIcon: 'account',
        inActiveIcon: 'account-outline'
    }
}
const tabBar = (props: BottomTabBarProps, appStackProps) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'white', height: 60 }}>
            {
                Object.values(props.state.routeNames).map((route: String) => {
                    let isActive = props.state.routeNames[props.state.index] == route
                    let iconStyle = {
                        color: Colors.pallette3.primary
                    }
                    if (isActive) {
                        iconStyle = {
                            color: Colors.pallette3.primary
                        }
                    } else {
                        iconStyle = {
                            color: 'grey'
                        }
                    }

                    const onPress = () => {
                        let isFocused = props.state.routeNames[props.state.index] === route;
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        // const event = props.navigation.emit({
                        //     type: 'tabPress',
                        //     target: route as string,
                        //     canPreventDefault: true
                        // });
                        // if (!isFocused && !event.defaultPrevented) {
                        //     props.navigation.navigate(route as string, {})
                        // }
                        if (route == 'Chat') {
                            route = "Chat1"
                            console.log("Invoked")
                            appStackProps.navigation.navigate(HomeRoutes.Chat)
                        } else {
                            props.navigation.dispatch(
                                CommonActions.navigate({ name: route as string })
                            )
                        }

                    }

                    return (
                        <PressableComponent
                            rippleColor='dark' foreground={true} key={route as string}
                            onClick={onPress}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, flexDirection: 'column' }}>
                            <Icon style={[{ marginBottom: 4 }, iconStyle]} size={24} name={isActive ? RoutesConfig[route as string].activeIcon : RoutesConfig[route as string].inActiveIcon} />
                            {
                                isActive &&
                                <Text style={[{ fontSize: 10, color: Colors.pallette3.primary, fontWeight: 'bold' }, fonts.nunitoRegular]}>{route}</Text>
                            }
                        </PressableComponent>
                    )
                })}
        </View>
    )
}

const AppStack = (appStackProps) => {
    // const Drawer = createDrawerNavigator();
    const Tab = createBottomTabNavigator();


    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [])

    return (
            <GestureHandlerRootView>
                <View style={{ height: '100%', width: '100%' }}>
                    <Tab.Navigator
                        sceneContainerStyle={{ height: '100%', width: '100%' }}
                        screenOptions={{ headerShown: false }} initialRouteName={RootBottomRoutes.Home} tabBar={(props: BottomTabBarProps) => { return tabBar(props, appStackProps) }}>
                        <Tab.Screen name={RootBottomRoutes.Home} component={DashboardScreen2} />
                        <Tab.Screen name={RootBottomRoutes.Search} component={SearchOrganization} />
                        {/* <Tab.Screen name={RootBottomRoutes.Chat} component={Chat} /> */}
                        <Tab.Screen name={RootBottomRoutes.Notifications} component={Notification} />
                        <Tab.Screen name={RootBottomRoutes.Profile} component={Profile} />
                    </Tab.Navigator>
                </View>
            </GestureHandlerRootView>
    )
    // return (
    //     <Drawer.Navigator initialRouteName={'Home'} drawerContent={DrawerComponent} screenOptions={{ headerShown: false }}>
    //         {/* <Drawer.Screen name={'OrgPage'} component={Test1} /> */}
    //         {/* <Drawer.Screen name={Screens.DASHBOARD} component={DashboardScreen} />
    //         <Drawer.Screen name={Screens.CREATEORG} component={CreateOrganization} />
    //         <Drawer.Screen name={Screens.PROFILE} component={Profile} options={{ swipeEnabled: false, headerShown: false }} /> */
    //         }
    //         <Drawer.Screen name={DrawerRoutes.Home} component={HomeStack} />
    //         <Drawer.Screen name={DrawerRoutes.Chat} component={Chat} options={{swipeEnabled: false}} />
    //         {/* <Drawer.Group>
    //             <Drawer.Screen name={Screens.DASHBOARD} component={DashboardScreen2} />
    //             <Drawer.Screen name={Screens.PROFILE} component={Profile} options={{ swipeEnabled: false, headerShown: false }} />

    //         </Drawer.Group> */}
    //     </Drawer.Navigator>
    // )
}

export default AppStack