import { View, Text, BackHandler, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import StatusBarComponent from '../components/StatusBarComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Avatar, Badge, Button, Divider, IconButton, Menu, PaperProvider } from 'react-native-paper'
import { Colors, s } from '../constants/styles'
import PressableComponent from '../components/PressableComponent'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import MenuItem from 'react-native-paper/lib/typescript/src/components/Menu/MenuItem'
import { BackgroundImage, Icon } from '@rneui/base'
import LinearGradient from 'react-native-linear-gradient'
import { Shadow } from 'react-native-shadow-2'
import GradientCardComponent from '../components/GradientCardComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Screens } from '../utils'
import { actions, useAppDispatch } from '../store'
import { LoadingState } from '../store/Slice'
import { HomeRoutes } from '../stacks/HomeStack'

interface DashboardScreenProps {
  navigation: DrawerNavigationProp<{}>
}



const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [menuVisible, setMenuVisible] = React.useState(false)
  const dispatch = useAppDispatch();
  const win = Dimensions.get('window');
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, [navigation])

  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      paddingHorizontal: 18,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      alignSelf: 'center',
      width: win.width,
      height: win.height
    },
    hamburgerStyle: { padding: 8, borderRadius: 100, overflow: 'hidden' },
    hamburgerImage: { height: 30, width: 30 }
  })

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch(actions.slice1.setUserLogState(LoadingState.false))
  }


  return (
    <View style={[s.fHW, { backgroundColor: 'white' }]}>
      <StatusBarComponent barStyle='dark-content' type='Normal' />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => { navigation.openDrawer() }}>
              <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 10 }}>
                <Image style={styles.hamburgerImage} resizeMode='contain' source={require('../../assets/images/hamburger_menu.png')} />
              </View>
            </TouchableWithoutFeedback>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ position: 'relative', marginRight: 14 }}>
                <PressableComponent foreground={true} onClick={() => { }} style={{ borderRadius: 100, padding: 10, overflow: 'hidden' }}>
                  <Image source={require('../../assets/images/bell_icon.png')} style={{ height: 25, width: 25 }} />
                </PressableComponent>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Badge style={{ backgroundColor: '#FF0000' }}>3</Badge>
                </View>
              </View>
              <Menu
                visible={menuVisible}
                onDismiss={() => { setMenuVisible(false) }}
                anchorPosition='bottom'
                contentStyle={{ backgroundColor: Colors.white, borderRadius: 8, position: 'relative' }}
                style={{ marginTop: 30 }}
                anchor={
                  <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                    <PressableComponent onClick={() => {
                      // setMenuVisible(true);
                      navigation.navigate(Screens.PROFILE)
                    }} foreground={false} style={{ padding: 6 }}>
                      <Avatar.Image size={44} source={require('../../assets/images/person_test.png')} />
                    </PressableComponent>
                  </View>
                }>
                <View>
                  <Menu.Item onPress={() => { setMenuVisible(false) }} title="Item 1" />
                  <Divider />
                  <Menu.Item onPress={logout} title="Logout" />
                </View>
              </Menu>
            </View>
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontFamily: 'Nunito-ExtraBold', fontSize: 34, color: 'black' }}>Hi Bilal,</Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 80 }}>
            <View style={{ marginTop: 0 }}>
              <GradientCardComponent onClick={() => { }} borderRadius={10} colors={['#C6ACFD', '#9DA7FF']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 14, justifyContent: 'space-between' }}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Image style={{ height: 40, width: 40 }} source={require('../../assets/images/people_icon.png')} />
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 24, color: 'white' }}>Find Groups</Text>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Rajdhani-Regular', fontSize: 34, color: 'white' }}>2,901</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 14, color: 'white' }}>Groups Available</Text>
                  </View>
                </View>
              </GradientCardComponent>
            </View>
            <View style={{ marginTop: 14 }}>
              <GradientCardComponent onClick={() => { navigation.navigate(Screens.CREATEORG) }} borderRadius={10} colors={['#FFACB0', '#FF8B90']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 20 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
                    <Image style={{ height: 45, width: 45 }} source={require('../../assets/images/plus.png')} />
                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                      <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 22, color: 'white' }}>Create an</Text>
                      <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 22, color: 'white' }}>Organization</Text>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '8%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                      <Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 14 }}>Joined</Text>
                      <Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 14 }}>8</Text>

                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 14 }}>
                      <Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 14 }}>Created</Text>
                      <Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 14 }}>3</Text>

                    </View>
                  </View>
                </View>
              </GradientCardComponent>
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              <View style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                <Shadow offset={[0, 8]} distance={12} style={{ width: '100%', borderRadius: 20, marginBottom: 20, overflow: 'hidden' }}>
                  <PressableComponent foreground={true} rippleColor='light'>
                    <Image style={{ height: 110, width: '100%' }} resizeMode='stretch' source={require('../../assets/images/chat_back1.png')} />
                    <View style={{ width: '100%', backgroundColor: 'white', padding: 14 }}>
                      <Text style={{ fontFamily: 'Alegreya-Bold', color: '#32B5FF', fontSize: 18 }}>Chats</Text>
                    </View>
                  </PressableComponent>
                </Shadow>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                <Shadow offset={[0, 8]} distance={12} style={{ width: '100%', borderRadius: 20, marginBottom: 20, overflow: 'hidden' }}>
                  <PressableComponent foreground={true} rippleColor='light'>
                    <Image style={{ height: 110, width: '100%' }} resizeMode='stretch' source={require('../../assets/images/group_back1.png')} />
                    <View style={{ width: '100%', backgroundColor: 'white', padding: 14 }}>
                      <Text style={{ fontFamily: 'Alegreya-Bold', color: '#C8A7FF', fontSize: 18 }}>Groups</Text>
                    </View>
                  </PressableComponent>
                </Shadow>
              </View>

            </View>
            <View style={{ width: '100%', display: 'flex', marginTop: 14 }}>
              <GradientCardComponent onClick={() => {
                navigation.navigate('OrgPage', { screen: 'test' }) 
              }} borderRadius={10} colors={['#A4F4C4', '#98B79D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', padding: 14 }}>
                  <Image style={{ height: 80, width: 80 }} resizeMode='contain' source={require('../../assets/images/flow_chart_icon.png')} />
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                    <Text style={{ fontFamily: 'Nunito-ExtraBold', fontSize: 24, color: 'white' }}>Organizations</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 14, color: 'white', marginTop: 10 }}>Joined: 4</Text>
                  </View>
                </View>
              </GradientCardComponent>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View >
  )
}

export default DashboardScreen