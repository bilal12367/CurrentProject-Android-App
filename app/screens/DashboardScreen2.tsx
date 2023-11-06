import { View, Text, Image, Dimensions, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import StatusBarComponent from '../components/StatusBarComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native'
import PressableComponent from '../components/PressableComponent'
import { Avatar, Badge } from 'react-native-paper'
import { Screens } from '../utils'
import { Colors, fonts } from '../constants/styles'
import { useGetOrgListQuery } from '../store/RTKQuery'
import ImageItem from '../components/ImageItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import { HomeRoutes } from '../stacks/HomeStack'
import { DrawerRoutes } from '../stacks/AppStack'
import { Icon } from '@rneui/base'
import { ChatRoutes } from './Chat'

const DashboardScreen2 = ({ navigation }) => {
    const win = Dimensions.get('window')
    const orgList = useGetOrgListQuery('')
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
    useFocusEffect(
        React.useCallback(() => {
            orgList.refetch();
        }, [])
    )

    useEffect(() => {
        if (orgList.isSuccess) {
        }
    }, [orgList])

    return (
        <SafeAreaView>
            <StatusBarComponent barStyle='dark-content' type='Normal' />
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => { navigation.openDrawer() }}>
                    <View style={{ padding: 14, borderRadius: 10 }}>
                        <Image style={styles.hamburgerImage} resizeMode='contain' source={require('../../assets/images/hamburger_menu.png')} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ position: 'relative', marginRight: 14, borderRadius: 100, overflow: 'hidden' }}>
                    <PressableComponent onClick={() => {
                        // setMenuVisible(true);
                        navigation.navigate(HomeRoutes.Profile)
                    }} foreground={false} style={{ padding: 6 }}>
                        <Avatar.Image size={44} source={require('../../assets/images/person_test.png')} />
                    </PressableComponent>
                </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={fonts.head1}>
                    Welcome <Text style={{ color: Colors.pallette3.third }}>Bilal,</Text>
                </Text>
                <Text style={[fonts.head2, { marginTop: 14 }]}>
                    Organizations
                </Text>
            </View>

            <View style={{ marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row' }}>
                <ScrollView horizontal={true} style={{ width: '100%', display: 'flex', flex: 1, flexWrap: 'wrap' }}>
                    <Pressable onPress={() => { navigation.navigate(HomeRoutes.CreateOrg) }} android_ripple={{ color: 'rgba(0,0,0,0.2)', foreground: true }} style={{ marginLeft: 20, backgroundColor: 'white', borderWidth: 1, borderStyle: 'dashed', borderColor: 'grey', padding: 14, elevation: 10, marginVertical: 14 }}>
                        <Icon name='add' color={'grey'} />
                    </Pressable>
                    {orgList.isSuccess &&
                        Object.values(orgList.data.orgs).map((org: any, index) => {
                            return (
                                <View key={org._id}>
                                    <Badge style={{ position: 'absolute', right: 0, top: 0, zIndex: 3 }}>3</Badge>
                                    <Pressable
                                        key={org._id}
                                        android_ripple={{ foreground: true, color: 'rgba(0,0,0,0.2)' }}
                                        onPress={() => { navigation.navigate(DrawerRoutes.Chat, { screen: ChatRoutes.ChatHome.name, params: { orgId: org._id } }) }}
                                        style={{ borderRadius: 8, overflow: 'hidden', elevation: 8, marginVertical: 10, marginLeft: index == 0 ? 20 : 14, marginRight: index == orgList.data.orgs.length - 1 ? 10 : 0 }}>
                                        <View style={{ height: 60, width: 60 }}>
                                            <ImageItem fileId={org.logo} />
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default DashboardScreen2