import { View, Pressable, StyleSheet, StyleSheetProperties, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, ReactNode } from 'react'
import { Text } from '@rneui/themed'
import { Colors } from '../constants/styles'

interface PressableComponentProps {
  children: Element | React.FC,
  onClick?: () => void,
  style?: StyleProp<ViewStyle>,
  foreground?: boolean,
  rippleColor?: 'dark' | 'light'
}

const PressableComponent = ({ children, onClick = () => { }, style = {}, foreground = false, rippleColor = 'dark' }: PressableComponentProps) => {
  const styles = StyleSheet.create({
    drawerListItem: {
      width: '100%', backgroundColor: Colors.pallette1.light1,
      padding: 14
    }
  })

  return (
    <Pressable android_ripple={{ color: rippleColor == 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.4)', foreground }} style={style} onPress={onClick}>
      {children as ReactNode}
    </Pressable>
  )
}

export default PressableComponent