import { View, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '@rneui/themed'
import PressableComponent from './PressableComponent';
import { Colors } from '../constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { Screens } from '../utils';


const DrawerComponent = (props: NavigationProp) => {

    const [selectedRoute, setSelectedRoute] = useState('Dashboard');
    const styles = StyleSheet.create({
        listView: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white'
        },
        selectedListItem: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginHorizontal: 5,
            marginVertical: 5,
            backgroundColor: Colors.pallette3.primary,
            borderRadius: 5
        },
        listItem: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginHorizontal: 5,
            marginVertical: 5,
        },
        listText: {
            color: Colors.pallette3.primary,
            fontWeight: 'bold'
        },

    })
    const navigate = (route: string) => {
        props.navigation.navigate(route);
        setSelectedRoute(route)
    }
    return (
        <View style={styles.listView}>
            {/* <Text>{JSON.stringify(props)}</Text> */}
            <SafeAreaView>
                <View style={styles.listView}>
                    {Object.values(props.state.routeNames).map((route) => {
                        let style = StyleSheet.create({
                            activeStyle: {
                                backgroundColor: Colors.pallette3.primary,
                                color: 'white'
                            },
                            inActiveStyle: {
                                backgroundColor: 'transparent',
                                color: Colors.pallette3.primary
                            },
                            viewStyle: {
                                paddingVertical: 14,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                                marginHorizontal: 8,
                                borderRadius: 5
                            },
                            fontStyle: {
                                fontSize: 14,
                                fontWeight: 'bold'
                            }
                        })


                        return (
                            <PressableComponent key={route as string} style={[style.viewStyle,props.state.routeNames[props.state.index] == route ? style.activeStyle : style.inActiveStyle]} onClick={() => { navigate(route as string) }}>
                                <Text style={[style.fontStyle,props.state.routeNames[props.state.index] == route ? style.activeStyle : style.inActiveStyle]}>
                                    {route as React.ReactNode}
                                </Text>
                            </PressableComponent>
                        )
                    })}
                </View>
            </SafeAreaView>
        </View>
    )


}

export default DrawerComponent