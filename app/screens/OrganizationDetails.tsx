import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { NavigationScreenProp } from 'react-navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAddRequestToJoinOrgMutation, useLazyGetOrgDetailsQuery } from '../store/RTKQuery'
import ImageItem from '../components/ImageItem'
import StatusBarComponent from '../components/StatusBarComponent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button, Divider, IconButton } from 'react-native-paper'
import { ICouncilMember } from '../utils'
import ButtonPressable from '../components/ButtonPressable'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import Animated, { Easing, withTiming } from 'react-native-reanimated'
import { Colors, fonts } from '../constants/styles'
import { HomeRoutes } from '../stacks/HomeStack'


const OrganizationDetails = (props: any) => {
    const dHeight = Dimensions.get('screen').height
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    let OrgId = props.route.params.orgId;
    const gh = Dimensions.get('window').height;
    const snapPoints = useMemo(() => ['74.5%'], []);
    const [reqOrg, respOrg, lastInfo] = useLazyGetOrgDetailsQuery()
    const [addReqOrg, respAddReqOrg] = useAddRequestToJoinOrgMutation()
    useEffect(() => {
        if (respOrg.isUninitialized) {
            reqOrg(OrgId);
        }
        if (respOrg.isSuccess) {
        }
    }, [respOrg])

    useEffect(() => {
        console.log('respAddReqOrg', respAddReqOrg)
        if (respAddReqOrg.isSuccess) {
            console.log("Invoked RespAddOrg Calling API to get org details again")
            reqOrg(OrgId)
            bottomSheetModalRef.current?.close()
        }
    }, [respAddReqOrg])

    const styles = StyleSheet.create({
        bannerStyle: {
            width: '100%',
            height: dHeight * 0.25
        },
        logoCont: {
            position: 'absolute',
            height: gh * 0.08,
            width: gh * 0.08,
            backgroundColor: 'white',
            bottom: -(gh * 0.04),
            left: gh * 0.03,
            borderRadius: 14,
            padding: 3
        },
        orgNameText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black'
        },
        orgDescText: {
            marginTop: 14
        },
        orgInfoCont: {
            marginTop: (gh * 0.04) + 10,
            paddingHorizontal: 14
        },
        infoDetailsRow: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingHorizontal: 14
        },
        dotInfoCont: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        dotView: {
            height: 12,
            width: 12,
            padding: 5,
            borderRadius: 100
        },
        accessServerCont: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ebebeb',
            padding: 4,
            paddingHorizontal: 8,
            borderRadius: 100
        },
        worldIconStyle: { backgroundColor: 'white', padding: 2, borderRadius: 100 },
    })

    const openSheet = () => {
        bottomSheetModalRef.current?.present()
        // bottomSheetModalRef.current?.snapToIndex(1, withTiming(200, {duration: 200, easing: Easing.inOut}))
    }

    const handleSheetChanges = useCallback((index: number) => {
        console.log("Hello, ", index)
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={{ position: 'relative', height: '100%' }}>
                <StatusBarComponent barStyle='light-content' />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    backgroundStyle={{ borderRadius: 24, backgroundColor: 'white' }}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={fonts.head2}>Council Members</Text>
                        <Text style={[fonts.body1, { marginVertical: 14 }]}>Pick a Council Member To Send Request.</Text>
                        <Divider />
                        <View style={{ marginTop: 14 }}>
                            {
                                respOrg.isSuccess &&
                                Object.values(respOrg.data.leaders).map((leader: ICouncilMember) => {

                                    const addRequestToOrg = () => {
                                        console.log("Adding Request")
                                        addReqOrg({ orgId: OrgId, reqMember: leader._id })
                                    }

                                    return (
                                        <View key={leader._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View style={{ width: 50, height: 50, borderRadius: 100, overflow: 'hidden' }}>
                                                    <ImageItem fileId={leader.profilePic} />
                                                </View>
                                                <View style={{ marginLeft: 16 }}>
                                                    <Text style={fonts.head2}>{leader.name}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <ButtonPressable buttonStyle={{ padding: 7 }} text='Send Request' ripple_color='dark' onPress={() => { addRequestToOrg() }} />
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </BottomSheetModal>
                {/* <Text>OrganizationDetails</Text>*/}
                {/* <Text>{JSON.stringify(respOrg.data.bannerPics[0])}</Text>  */}
                {
                    respOrg.isSuccess &&
                    <View>
                        <View style={{ position: 'relative', display: 'flex' }}>
                            <View style={styles.bannerStyle}>
                                <ImageItem fileId={respOrg.data.bannerPics[0]} />
                            </View>
                            <View style={styles.logoCont}>
                                <View style={{ borderRadius: 14, overflow: 'hidden' }}>
                                    <ImageItem fileId={respOrg.data.logo} />
                                </View>
                            </View>

                        </View>
                        <View style={styles.orgInfoCont}>
                            <Text style={styles.orgNameText}>✅ {respOrg.data.name}</Text>
                            <Text style={styles.orgDescText}>{respOrg.data.desc}</Text>

                        </View>
                        <View style={styles.infoDetailsRow}>
                            <View style={styles.accessServerCont}>
                                <Icon style={styles.worldIconStyle} size={16} name='earth' />
                                <Text style={{ marginLeft: 5, fontSize: 12 }}>Public Server</Text>
                            </View>
                            <View style={styles.dotInfoCont}>
                                <View style={[styles.dotView, { backgroundColor: '#48C162' }]}></View>
                                <Text style={{ color: '#48C162', marginLeft: 6, fontSize: 14 }}>
                                    {respOrg.data.followers.length} Online
                                </Text>
                            </View>
                            <View style={styles.dotInfoCont}>
                                <View style={[styles.dotView, { backgroundColor: '#B7B7B7' }]}></View>
                                <Text style={{ color: '#B7B7B7', marginLeft: 6, fontSize: 14 }}>
                                    {respOrg.data.followers.length} Members
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <Divider />
                        </View>
                        <View style={{ marginTop: 14, paddingHorizontal: 14 }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Council Members</Text>
                            <View style={{ marginTop: 14 }}>
                                {
                                    Object.values(respOrg.data.leaders).map((leader: ICouncilMember) => {
                                        return (
                                            <View key={leader._id} style={{ height: 45, width: 45, borderRadius: 100, overflow: 'hidden', borderWidth: 3, borderColor: 'white', elevation: 3 }}>
                                                <ImageItem fileId={leader.profilePic} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                }
                {respOrg.isSuccess &&
                    <View style={{ position: 'absolute', width: '100%', bottom: 0, padding: 14 }}>
                        {
                            respOrg.data.isUserJoined.requestStatus.status == 'Not_Requested' &&
                            <View >
                                <Text style={{ fontSize: 20, color: 'black' }}>Request To Join</Text>
                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 14 }}>
                                    <ButtonPressable buttonStyle={{ flexGrow: 1 }} text='Request To Council' ripple_color='dark' onPress={openSheet} />
                                    <ButtonPressable backgroundColor='#FF869C' buttonStyle={{ flexGrow: 1, marginLeft: 14 }} text='Pick Admin To Request' ripple_color='dark' onPress={openSheet} />
                                </View>
                            </View>
                        }
                        {
                            respOrg.data.isUserJoined.requestStatus.status == 'Pending' &&
                            <View >
                                {/* <Text >{JSON.stringify(respOrg.data.isUserJoined.requestStatus)}</Text> */}
                                <Divider />
                                <Text style={[fonts.head3, { marginTop: 10 }]}>Your Request Is Pending With</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 40, height: 40, borderRadius: 100, overflow: 'hidden' }}>
                                            <ImageItem fileId={respOrg.data.isUserJoined.requestStatus.pendingWith.profilePic} />
                                        </View>
                                        <Text style={[fonts.head3, { marginLeft: 14 }]}>{respOrg.data.isUserJoined.requestStatus.pendingWith.name}</Text>
                                    </View>
                                    <View>
                                        <IconButton onPress={() => { 
                                            props.navigation.navigate(HomeRoutes.RequestChat,{requestId: respOrg.data.isUserJoined.requestStatus.requestId})
                                        }} iconColor={Colors.pallette3.primary} icon={'chat'} />
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                }
            </View>
        </BottomSheetModalProvider>
    )
}

export default OrganizationDetails

