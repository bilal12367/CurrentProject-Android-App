import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './Profile'
import DiscordLayoutScreen from './DiscordLayoutScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../constants/styles'
import PressableComponent from '../components/PressableComponent'
import { useAppSelector } from '../store'
import { $CombinedState } from '@reduxjs/toolkit'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export const ChatRoutes = {
  ChatHome: {
    name: 'ChatHome',
    activeIcon: 'home',
    inActiveIcon: 'home-outline'
  },
  ChatProfile: {
    name: 'ChatProfile',
    activeIcon: 'account',
    inActiveIcon: 'account-outline'
  }
}

const Chat = () => {
  // const params = navigation.route.params
  const isTabShown = useAppSelector((state) => state.reducer.isTabbarShown)
  const tabbarY = useSharedValue(0)
  const Tab = createBottomTabNavigator()
  const orgList = useAppSelector((state) => state.reducer.orgList)

  useEffect(() => {
    toggleTabbar(isTabShown)
  }, [isTabShown])

  const toggleTabbar = (isOpen: Boolean) => {
    'worklet';
    let distance = 200
    if (isOpen) {
      distance = 200
    } else {
      distance = 0
    }
    tabbarY.value = withTiming(distance, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
  }

  const tabbarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tabbarY.value
        }
      ]
    }
  })

  return (
    <View style={{ height: '100%', width: '100%' }}>

      <Tab.Navigator tabBar={(props: BottomTabBarProps) => {

        const onTabPress = (route: any, isFocused: boolean) => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route, {})
          }
        }
        return <Animated.View style={[{ backgroundColor: 'white', position: 'absolute', display: 'flex', flexDirection: 'row', bottom: 0 },tabbarStyle]}>
          {
            Object.values(props.state.routeNames).map((route: string, index: number) => {
              return (
                <PressableComponent onClick={() => {
                  onTabPress(route, props.state.index == index)
                }} foreground={true} style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                  <Icon size={24} color={props.state.index == index ? Colors.pallette3.primary : 'grey'} name={props.state.index == index ? ChatRoutes[route].activeIcon : ChatRoutes[route].inActiveIcon} />
                  <Text style={{ fontSize: 10, color: props.state.index == index ? Colors.pallette3.primary : 'grey', marginTop: 4 }}>{route}</Text>
                </PressableComponent>
              )
            })
          }
          {/* <Text>{JSON.stringify(props.state.routeNames)}</Text>
          <Text>{JSON.stringify(props.state.index)}</Text> */}
        </Animated.View>
      }} screenOptions={{ headerShown: false }}>
        <Tab.Screen name={ChatRoutes.ChatHome.name} component={DiscordLayoutScreen} />
        <Tab.Screen name={ChatRoutes.ChatProfile.name} component={Profile} />
      </Tab.Navigator>
    </View>
  )

  // return (
  //   <SafeAreaView>
  //     <View>
  //       <Text style={{ color: 'black' }}>Hello</Text>
  //     </View>
  //   </SafeAreaView>
  // )
}

export default Chat