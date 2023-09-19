
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { Colors } from './app/constants/styles';
import { Button, MD3Colors, MD3LightTheme, PaperProvider, Text } from 'react-native-paper';
import AppRouter from './app/router/AppRouter';
import {Provider} from 'react-redux'
import { store } from './app/store';
import { ThemeProp } from 'react-native-paper/lib/typescript/src/types';

function App(): JSX.Element {
  // const Drawer1 = createDrawerNavigator();
  
  const theme = createTheme({
    lightColors: {
      primary:'red'
    },
    components: {
      Text: {
        style: {
          color: 'black'
        }
      },
      Input: {
        style: {
          backgroundColor: 'white', borderRadius: 10, marginHorizontal: 0, padding: 14,
          color: Colors.pallette3.primary
        },
        selectionColor: Colors.pallette3.primary,
        cursorColor: Colors.pallette3.secondary,
        placeholderTextColor: Colors.pallette3.light2,
        inputContainerStyle: {borderBottomWidth: 0}
      },
      Button: {
        buttonStyle: {
          backgroundColor: Colors.pallette3.primary,
          borderRadius: 5,
        },
        
      }
    }
  })

  const theme1: ThemeProp = {
    // ...MD3LightTheme,
    colors: {
      // primary: Colors.pallette3.primary,
      // onSurface: 'black',
      
    },
  }

  return (
    
    <Provider store={store}>
        <PaperProvider theme={theme as any}>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </PaperProvider>
    </Provider>
);
}

export default App;


{/* <NavigationContainer>
  <Drawer1.Navigator initialRouteName="Welcome" drawerContent={(props)=> <DrawerComponent {...props}/>} screenOptions={{headerShown: false}}>
   <Drawer1.Screen name="Home" component={HomeScreen} />
   <Drawer1.Screen name="Welcome" component={WelcomeScreen} />
 </Drawer1.Navigator>
</NavigationContainer> */}
// <SafeAreaView>

// <NavigationContainer>
//   <Drawer.Navigator initialRouteName="Welcome">
//     <Drawer.Screen name="Home" component={HomeScreen} />
//     <Drawer.Screen name="Welcome" component={WelcomeScreen} />
//   </Drawer.Navigator>
// </NavigationContainer>

// <View style={[styles.center, {
//   flexDirection: 'column',
  
// }]}>
//   <Text style={{ color: 'black' }}>Home Page</Text>
//   <Button onPress={() => { toggle() }} title='Animate'></Button>
// </View>

// <Animated.View style={{
//   position: 'absolute', width: '100%', height: '100%',zIndex: -1, backgroundColor: overlayAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['rgb(0,0,0,0)', 'rgb(0,0,0,0.5)']
//   })
// }}>

// </Animated.View>
// {/* <Animated.View style={[{ position: 'absolute', width: '60%', backgroundColor: 'white', transform: [{ translateX: anim }] }, styles.center]}> */}
// <Animated.View style={[{ position: 'absolute', width: '60%', backgroundColor: 'white', left: drawerAnim, zIndex: 3 }, styles.center]}>

//   <Text style={{ color: 'black' }}>Drawer Page</Text>
//   <Button onPress={() => { toggle() }} title='Animate'></Button>
// </Animated.View>
// </SafeAreaView>