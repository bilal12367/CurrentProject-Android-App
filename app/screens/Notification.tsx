import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, fonts } from '../constants/styles'
import { useLazyGetAllRequestsQuery } from '../store/RTKQuery'
import { useIsFocused } from '@react-navigation/native'
import ImageItem from '../components/ImageItem'
import { Avatar, Button, Divider } from 'react-native-paper'
import PressableComponent from '../components/PressableComponent'
import { HomeRoutes } from '../stacks/HomeStack'
import ProfileAvatar3 from '../components/ProfileAvatar3'
import { INotification } from '../utils'



const Notification = (props) => {
    const [reqNotifications, respNotifications, lastResp] = useLazyGetAllRequestsQuery();
    const sw = Dimensions.get('screen').width;
    const isFocused = useIsFocused()
    useEffect(() => {
        if (respNotifications.isUninitialized) {
            reqNotifications('');
        } else if (respNotifications.isSuccess) {
        }
    }, [respNotifications, isFocused])
    return (
        <View>
            <View style={{ paddingHorizontal: 20, backgroundColor: 'white', elevation: 8, paddingBottom: 14 }}>
                <SafeAreaView>
                    <Text style={fonts.head2}>Notifications</Text>

                </SafeAreaView>
            </View>
            <View style={{ marginTop: 20 }}>
                {
                    respNotifications.isSuccess &&
                    Object.values(respNotifications.data as INotification[]).map((notification: INotification) => {
                        const sizeOfImg = 30;
                        return (
                            <PressableComponent onClick={() => { props.navigation.navigate(HomeRoutes.RequestChat, { requestId: notification._id }) }} key={notification._id} style={{ marginHorizontal: 16, padding: 8, paddingVertical: 14, borderRadius: 8, backgroundColor: 'white', elevation: 8 }}>
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                                        <View>
                                            <ProfileAvatar3 size={30} profilePic={notification.requested_user_id.profilePic as string} name={notification.requested_user_id.name} />
                                        </View>
                                        <View style={{ marginLeft: 14, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* {console.log(notification)} */}
                                            {/* <Text ellipsizeMode='middle'>{JSON.stringify(notification)}</Text> */}
                                            {
                                                notification.request_type == 'Join_Org' &&
                                                <Text style={[{ fontWeight: 'bold', fontSize: 15},fonts.nunitoRegular]}>
                                                    Join Request - {notification.requested_user_id.name} requires your approval for joining {notification.org_id.name}
                                                </Text>
                                            }
                                            <Text></Text>
                                        </View>
                                    </View>
                                </View>
                            </PressableComponent>
                        )
                    })
                }
            </View>
        </View>
    )
}



export default Notification

const styles = StyleSheet.create({})





// <PressableComponent onClick={() => { props.navigation.navigate(HomeRoutes.RequestChat, { requestId: notification._id }) }} key={notification._id} style={{ marginHorizontal: 16, padding: 8, paddingVertical: 14, borderRadius: 8, backgroundColor: 'white', elevation: 8 }}>
//                                 <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <View style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden', elevation: 4, borderWidth: 3, borderColor: '#b68fd9' }}>
//                                         <ImageItem fileId={notification.org_id.logo} />
//                                     </View>
//                                     <Image style={{ width: (sw * 0.15), height: 8, marginHorizontal: 8, resizeMode: 'stretch' }} source={require('../../assets/images/long_arrow.png')} />
//                                     <ProfileAvatar3 size={30} profilePic={notification.requested_user_id.profilePic} name={notification.requested_user_id.name}/>
//                                     {/* {
//                                         notification.requested_user_id.profilePic != null ?
//                                             <View style={{ height: sizeOfImg, width: sizeOfImg, borderRadius: 100, overflow: 'hidden' }}>
//                                                 <ImageItem fileId={notification.requested_user_id.profilePic} />
//                                             </View>
//                                             :
//                                             <View style={{ borderWidth: 2, borderColor: Colors.pallette3.primary, borderRadius: 100, padding: 2 }}>
//                                                 <Avatar.Text style={{ backgroundColor: Colors.pallette3.primary }} color='white' size={sizeOfImg + 5} label={notification.requested_user_id.name[0].toUpperCase()} />
//                                             </View>
//                                     } */}
//                                 </View>
//                                 <Divider style={{ marginVertical: 14 }} />
//                                 <View>
//                                     {
//                                         notification.request_type == "Join_Org" &&
//                                         <>
//                                             <Text>{notification.requested_user_id.name} is requesting to join organization {notification.org_id.name} </Text>
//                                             <Button style={{ backgroundColor: Colors.pallette3.primary, borderRadius: 10, marginTop: 10 }} mode='contained'>Take Action</Button>
//                                         </>

//                                     }
//                                 </View>

//                             </PressableComponent>