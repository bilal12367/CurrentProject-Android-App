import { View, Image, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, fonts, s } from '../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useGetAllOrgsQuery, useGetProfileImageQuery, useLazyGetAllOrgsQuery } from '../store/RTKQuery'
import { useFocusEffect } from '@react-navigation/native'
import ImageItem from '../components/ImageItem'
import PressableComponent from '../components/PressableComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeRoutes } from '../stacks/HomeStack'

interface IOrg {
  _id: string,
  name: string,
  followers: string,
  bannerPics: string[]
}

const SearchOrganization = (props: StackNavigationProp) => {
  const [reqGetAllOrgs, orgs, lastResp] = useLazyGetAllOrgsQuery()
  useFocusEffect(() => {
    console.log("Search Org Focused")
    if (orgs.isUninitialized) {
      reqGetAllOrgs('')
    }
  })

  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: Colors.pallette3.light1,
      borderRadius: 14,
      paddingLeft: 14,
    },
    searchIconView: {
      position: 'absolute',
      right: 14,
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  })

  return (
    <View>
      <SafeAreaView>
        <View style={{ marginVertical: 14, height: '100%' }}>
          <View style={{ marginHorizontal: 14 }}>
            <Text style={[fonts.head1]}>Organizations</Text>
            <View style={{ marginTop: 20, position: 'relative' }}>
              <TextInput placeholder='Search Organization By Name' style={styles.textInput} />
              <View style={styles.searchIconView}>
                <Icon size={30} name='magnify' color={Colors.pallette3.highlightLight1} />
              </View>
            </View>
          </View>
          <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            {
              orgs.isSuccess &&
              Object.values(orgs.data).map((org: IOrg, index: number) => {
                return (
                  <View key={org._id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', marginTop: 20, borderRadius: 14, overflow: 'hidden', elevation: 8, marginHorizontal: 14 }}>
                    <PressableComponent foreground={true} onClick={() => { props.navigation.navigate(HomeRoutes.OrgDetails, { orgId: org._id }) }} rippleColor='dark'>
                      <View style={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <ImageItem fileId={org.bannerPics[0]} />
                      </View>
                      <View style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
                        <Text style={{ fontSize: 14, color: 'black' }}>{(index + 1) + '. ' + org.name}</Text>
                      </View>
                    </PressableComponent>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SearchOrganization