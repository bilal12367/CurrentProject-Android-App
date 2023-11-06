import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { Easing, Extrapolation, interpolate, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import StatusBarComponent from '../components/StatusBarComponent'
import { useGetOrgDetailsQuery, useGetOrgListQuery, useLazyGetOrgDetailsQuery } from '../store/RTKQuery'
import ImageItem from '../components/ImageItem'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PressableComponent from '../components/PressableComponent'
import ChatPage from '../components/ChatPage'
import { DiscordPageState, GetOrgResp, Group } from '../utils'
import { actions, useAppDispatch, useAppSelector } from '../store'


class DiscordLayoutAnimation {
  public deviceWidth = Dimensions.get('screen').width
  public holderX = useSharedValue(0)
  public chatX = useSharedValue(0)
  public detailsX = useSharedValue(0)
  public end = (this.deviceWidth * 8.5) / 10

  constructor() {
    this.holderX = useSharedValue(0)
    this.chatX = useSharedValue(0)
    this.detailsX = useSharedValue(0)
    this.end = (this.deviceWidth * 8.5) / 10
  }

  public openDrawer = () => {
    'worklet';
    this.holderX.value = withTiming(this.end, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
  }
  public closeDrawer = () => {
    'worklet';
    this.holderX.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
  }
  public openDetails = () => {
    'worklet';
    this.chatX.value = withTiming(-this.end, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
  }
  public closeDetails = () => {
    'worklet';
    this.chatX.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
  }

  public panGestureEvent() {
    let this1 = this
    return useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event, context: any) => {
        if (this1.chatX.value == 0 && this1.holderX.value >= 0 && this1.holderX.value <= this1.end) {
          context.translateX = this1.holderX.value
        }
        if (this1.chatX.value <= 0 && this1.chatX.value >= (-this1.end) && this1.holderX.value == 0) {
          context.translateX = this1.chatX.value
        }

      },
      onActive: (event, context: any) => {
        // if (holderX.value > 20 && holderX.value < ((deviceWidth * 8) / 10)) {
        if ((this1.holderX.value == 0 || this1.holderX.value < this1.end) && this1.chatX.value == 0 && event.translationX > 0) {

          this1.holderX.value = event.translationX + context.translateX
        } else if (this1.chatX.value == 0 && this1.holderX.value > 0 && (this1.holderX.value < this1.end || event.translationX < 0)) {

          this1.holderX.value = event.translationX + context.translateX
        } else if (this1.holderX.value == 0 && this1.chatX.value >= 0 && event.translationX < 0) {

          this1.chatX.value = event.translationX + context.translateX
        } else if (this1.holderX.value == 0 && this1.chatX.value < 0 && (this1.chatX.value > (-this1.end) || event.translationX > 0)) {

          this1.chatX.value = event.translationX + context.translateX
        }
        // if (holderX.value >= 0 && holderX.value <= end && chatX.value == 0) {
        //   if(holderX.value != end && event.translationX < 0) {

        //   } else {
        //     holderX.value = event.translationX + context.translateX
        //   }
        // } else if (holderX.value == 0 && (chatX.value > 0 || chatX.value > (-end))) {
        //   holderX.value = 0
        //   chatX.value = event.translationX + context.translateX
        // }
        // }
      },
      onEnd: (event, context: any) => {
        if (this1.chatX.value == 0 && this1.holderX.value > 0 && event.translationX > 0) {
          this1.openDrawer()
        } else if (this1.chatX.value == 0 && this1.holderX.value <= this1.end && event.translationX < 0) {
          this1.closeDrawer()
        } else if (this1.chatX.value <= 0 && this1.holderX.value == 0 && event.translationX < 0) {
          this1.openDetails()
        } else if (this1.chatX.value <= 0 && this1.chatX.value >= (-this1.end) && event.translationX > 0) {
          this1.closeDetails()
        }
      }
    })
  }

  public holderXAnimStyle() {
    let tempHolderX = this.holderX
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: tempHolderX.value
          }
        ]
      }
    })
  }

  public chatXAnimStyle() {
    let tempChatX = this.chatX
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: tempChatX.value
          }
        ]
      }
    })
  }

  public detailXAnimStyle() {
    let tempDetailsX = this.detailsX
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: tempDetailsX.value
          }
        ]
      }
    })
  }
}

const DiscordLayoutScreen = (navigation) => {
  // const discordAnim = new DiscordLayoutAnimation()
  let orgId : string;
  if (navigation.route.params?.orgId) {
    orgId = navigation.route.params?.orgId
  }
  const isFocused = useIsFocused();
  const [orgReq, orgResp, lastInfo] = useLazyGetOrgDetailsQuery({ refetchOnFocus: true })
  const deviceWidth = Dimensions.get('screen').width
  const holderX = useSharedValue(0)
  const chatX = useSharedValue(0)
  const detailsX = useSharedValue(0)
  const end = (deviceWidth * 8.5) / 10
  const headerHeight = Dimensions.get('screen').height * 2 / 10

  const [selectedOrg, setSelectedOrg] = useState<GetOrgResp | undefined>(undefined)
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>()
  const dispatch = useAppDispatch();
  const pageState = useAppSelector((state) => state.reducer.discordPageState)
  const orgsList = useAppSelector((state) => state.reducer.orgList)

  const silverAppBarY = useSharedValue(0)

  useEffect(() => {
    if (orgResp.isSuccess) {
      setSelectedOrg(orgResp.data)
      if (orgResp.data.groups.length > 0) {
        setSelectedGroup(orgResp.data.groups[0])
      }
    }
    if (orgResp.isUninitialized && (orgId != "" && orgId != undefined)) {
      orgReq(orgId)
    }
    if(orgId == undefined && orgsList.length != 0 && orgResp.isUninitialized) {
      orgReq(orgsList[0])
    }
  }, [orgResp])



  useEffect(() => {

    if (pageState == DiscordPageState.Drawer) {
      dispatch(actions.slice1.setTabState(false))
    } else {
      dispatch(actions.slice1.setTabState(true))
    }
  }, [pageState])

  const orgList = useGetOrgListQuery('')

  const styles = StyleSheet.create({
    fHWC: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    fHW: {
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    head1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black'
    }
  })

  const updatePageState = (pageState1: DiscordPageState) => {
    dispatch(actions.slice1.setDiscordPageState(pageState1))
  }

  const openDrawer = () => {
    'worklet';
    holderX.value = withTiming(end, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
    // runOnJS(setPageState)(DiscordPageState.Drawer)
    runOnJS(updatePageState)(DiscordPageState.Drawer)
  }
  const closeDrawer = () => {
    'worklet';
    holderX.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
    runOnJS(updatePageState)(DiscordPageState.Chat)
  }
  const openDetails = () => {
    'worklet';
    chatX.value = withTiming(-end, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
    runOnJS(updatePageState)(DiscordPageState.Details)
  }
  const closeDetails = () => {
    'worklet';
    chatX.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.quad)
    })
    runOnJS(updatePageState)(DiscordPageState.Chat)
  }

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event, context) => {
      if (chatX.value == 0 && holderX.value >= 0 && holderX.value <= end) {
        context.translateX = holderX.value
      }
      if (chatX.value <= 0 && chatX.value >= (-end) && holderX.value == 0) {
        context.translateX = chatX.value
      }

    },
    onActive: (event, context: any) => {
      // if (holderX.value > 20 && holderX.value < ((deviceWidth * 8) / 10)) {
      if ((holderX.value == 0 || holderX.value < end) && chatX.value == 0 && event.translationX > 0) {
        holderX.value = event.translationX + context.translateX
      } else if (chatX.value == 0 && holderX.value > 0 && (holderX.value < end || event.translationX < 0)) {
        holderX.value = event.translationX + context.translateX
      } else if (holderX.value == 0 && chatX.value >= 0 && event.translationX < 0) {
        chatX.value = event.translationX + context.translateX
      } else if (holderX.value == 0 && chatX.value < 0 && (chatX.value > (-end) || event.translationX > 0)) {
        chatX.value = event.translationX + context.translateX
      }

      if (holderX.value < 0) {
        holderX.value = 0
      } else if (chatX.value > 0) {
        chatX.value = 0
      }
      // if (holderX.value >= 0 && holderX.value <= end && chatX.value == 0) {
      //   if(holderX.value != end && event.translationX < 0) {

      //   } else {
      //     holderX.value = event.translationX + context.translateX
      //   }
      // } else if (holderX.value == 0 && (chatX.value > 0 || chatX.value > (-end))) {
      //   holderX.value = 0
      //   chatX.value = event.translationX + context.translateX
      // }
      // }
    },
    onEnd: (event, context: any) => {
      if (chatX.value == 0 && holderX.value > 0 && event.translationX > 0) {
        if (event.velocityX > 1000) {
          openDrawer()
        } else {
          closeDrawer()
        }
      } else if (chatX.value == 0 && holderX.value <= end && event.translationX < 0) {
        if (event.velocityX < -1000) {
          closeDrawer()
        } else {
          openDrawer()
        }
      } else if (chatX.value <= 0 && holderX.value == 0 && event.translationX < 0) {
        openDetails()
      } else if (chatX.value <= 0 && chatX.value >= (-end) && event.translationX > 0) {
        closeDetails()
      }
    }
  })

  const holderXAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: holderX.value
        }
      ]
    }
  })
  const chatXAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: chatX.value
        }
      ]
    }
  })
  const detailXAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: detailsX.value
        }
      ]
    }
  })

  const headerOpacity = useAnimatedStyle(() => {
    const opacityInterpolate = interpolate(silverAppBarY.value, [0, headerHeight], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP
    })
    return ({
      opacity: opacityInterpolate,
      // transform: [
      //   {
      //     translateY: 0
      //   }
      // ]
    })
  })

  const silverContainer = useAnimatedStyle(() => {
    return ({
      transform: [
        {
          translateY: -silverAppBarY.value
        }
      ]
    })
  })

  const contentColorInterpolate = useAnimatedStyle(() => {
    const contentInterpolate = interpolateColor(silverAppBarY.value, [0, headerHeight], ['white', 'black'])
    return ({
      color: contentInterpolate
    })
  })

  const contentBackground = useAnimatedStyle(() => {
    const contentInterpolate = interpolateColor(silverAppBarY.value, [0, headerHeight], ['transparent', 'white'])
    return ({
      backgroundColor: contentInterpolate
    })
  })

  return (
    <GestureHandlerRootView>
      <StatusBarComponent barStyle='dark-content' type='Normal' />
      <View style={{ height: '100%' }}>
        <PanGestureHandler onGestureEvent={panGestureEvent} activeOffsetX={[-30, 30]} activeOffsetY={[-10000, 100000]}>
          <Animated.View style={{ width: '100%', height: '100%', position: 'relative' }}>
            <View style={[styles.fHW, { width: end, position: 'absolute' }]}>
              <SafeAreaView>
                <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>



                  {/* // Org List Side View */}
                  <View style={{ height: '100%', width: 60, display: 'flex', alignItems: 'center' }}>
                    {
                      orgList.isSuccess &&
                      Object.values(orgList.data.orgs).map((org: any) => {
                        return <View key={org._id} style={{ height: 50, width: 50, borderRadius: 4, overflow: 'hidden' }}>
                          <Pressable onPress={() => {
                            orgReq(org._id)
                          }} android_ripple={{ foreground: true, color: 'rgba(0,0,0,0.3)' }}>
                            <ImageItem fileId={org.logo} />
                          </Pressable>
                        </View>
                      })
                    }
                  </View>



                  {/* Org Details View / Drawer Type View */}
                  <View style={{ display: 'flex', flexGrow: 1, paddingHorizontal: 8 }}>
                    <View style={{ display: 'flex', flexGrow: 1, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, overflow: 'hidden' }}>
                      {
                        selectedOrg &&
                        <View style={[{ height: '100%', display: 'flex' }]}>
                          <Animated.View style={[{ display: 'flex', flexDirection: 'row', width: '100%', position: 'absolute', top: 0, zIndex: 3, padding: 14 }, contentBackground]}>
                            <Animated.Text style={[{ fontSize: 16, elevation: 2 }, contentColorInterpolate]}>{selectedOrg.name}</Animated.Text>
                          </Animated.View>
                          <Animated.View style={[{ width: '100%', height: headerHeight, position: 'absolute' }, headerOpacity]}>
                            <ImageItem fileId={selectedOrg.logo} />
                          </Animated.View>
                          <Animated.ScrollView
                            style={[{ marginTop: headerHeight + 20, backgroundColor: 'white', flexGrow: 1 }, silverContainer]}
                            onScroll={(e) => {
                              silverAppBarY.value = e.nativeEvent.contentOffset.y

                            }}>
                            {
                              Object.values(selectedOrg.groups).map((group: any) => {
                                return (
                                  <View key={group._id} style={{ paddingHorizontal: 6, marginTop: 5 }}>
                                    <PressableComponent
                                      style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', padding: 5, paddingHorizontal: 8 }}
                                      foreground={true}
                                      rippleColor='dark'
                                      onClick={() => {
                                        setSelectedGroup(group)
                                      }}>
                                      <Icon name='pound' color={'grey'} size={20} />
                                      <Text style={{ marginLeft: 8 }} >{group.groupName}</Text>
                                    </PressableComponent>
                                  </View>
                                )
                              })
                            }
                          </Animated.ScrollView>
                        </View>
                      }
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </View>
            <Animated.View style={[styles.fHWC, { backgroundColor: 'red', position: 'absolute', zIndex: 1 }, holderXAnimStyle]}>
              <View style={[styles.fHWC, { backgroundColor: '#d3bdff', width: end, right: 0, position: 'absolute' }]}>
                <Text style={styles.head1}>Details</Text>
              </View>
              <Animated.View style={[styles.fHW, { backgroundColor: 'white', elevation: 14, position: 'absolute', zIndex: 2 }, chatXAnimStyle]}>

                {/* <Text style={[styles.head1, { color: 'black' }]}>Chat</Text> */}
                {
                  selectedGroup &&
                  <ChatPage
                    group={selectedGroup}
                    pageActions={{ openDrawer: openDrawer, openDetails: openDetails, closeDetails: closeDetails, closeDrawer: closeDrawer }}
                  />
                }

              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default DiscordLayoutScreen