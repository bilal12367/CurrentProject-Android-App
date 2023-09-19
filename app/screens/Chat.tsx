import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const Chat = (navigation) => {
  const { orgId, groupId, messageId } = navigation.route.params
  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: 'black' }}>{orgId}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Chat