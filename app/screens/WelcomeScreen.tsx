import { StyleSheet, View, StatusBar, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Text } from '@rneui/themed'
import { Colors, s } from '../constants/styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import StatusBarComponent from '../components/StatusBarComponent'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WelcomeScreenProp {
  navigation: NativeStackNavigationProp<{}>
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProp) => {
  // const { loadFromAsyncStorage } = useAuth() as AuthProviderType
  // const route = useRoute();
  // const dispatch = useDispatch()
  // const [testServerUrlReq, testServerUrlRes] = useTestServerUrlMutation();
  // const authState = useAppSelector(state => state.authReducer.auth);
  // const server_url = useAppSelector(state => state.authReducer.server_url)
  // const authLoadingState = useAppSelector(state => state.authReducer.loadStates.authLoading);

  const styles = StyleSheet.create({
    drawerListItem: {
      width: '100%', backgroundColor: Colors.pallette1.light1,
      padding: 14
    },
    logo: {
      height: 140,
      width: 110,
      margin: 10,
      resizeMode: 'stretch'
    },
    logoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 4,
      marginTop: 10
    }
  })


  return (
    <View>
      <StatusBarComponent type='Home' barStyle='dark-content' />
      <SafeAreaView>
        <View style={[s.fHWC, { display: 'flex', flexDirection: 'column' }]}>

          <Image style={styles.logo} source={require('../../assets/images/synlogo2.png')} />

          <Text style={styles.logoTitle}>CONSORTIUM</Text>
          <ActivityIndicator color='black' size={40} style={{ marginTop: 20 }} />

        </View>
      </SafeAreaView>
    </View>
  )
}

export default WelcomeScreen