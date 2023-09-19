import { View, Text, Pressable, Image, StyleSheetProperties, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'

interface StylishCard1Props {
    height?: number,
    ripple_color?: 'dark' | 'white',
    style?: StyleProp<ViewStyle>,
    centerImage: React.ReactNode,
    backgroundColor: string,
    text: string,
    bottomText: string,
    onPress?: () => void
}

const StylishCard1 = ({ onPress = () => { }, backgroundColor, height = 120, ripple_color = 'white', style = {}, centerImage, bottomText, text }: StylishCard1Props) => {
    let rip_color = ''
    if (ripple_color == 'dark') {
        rip_color = 'rgba(0,0,0,0.2)'
    } else {
        rip_color = 'rgba(255,255,255,1)'
    }
    return (
        <View style={[{ display: 'flex', flexGrow: 1 }, style]}>
            <View style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height, borderRadius: 12, elevation: 12, backgroundColor: backgroundColor }}>
                <Pressable onPress={onPress} style={{ flexGrow: 1 }} android_ripple={{ color: rip_color }}>
                    <View style={{ flexGrow: 1, display: 'flex', position: 'relative', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }}>
                        <View style={{ height: 2 }}></View>
                        <Image style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }} source={require('../../assets/images/cover1.png')} />
                        <View style={{ position: 'absolute', top: 0, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Image style={{ width: 40, height: 20 }} source={require('../../assets/images/cover2.png')} />
                        </View>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            {centerImage}
                            <Text style={{ color: 'white', fontSize: 11 }}>{text}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 14, width: 14 }} source={require('../../assets/images/Eye.png')} />
                            <Text style={{ color: 'white', fontSize: 11, marginLeft: 4 }}>{bottomText}</Text>
                        </View>
                    </View>
                </Pressable>

            </View>
        </View>
    )
}

export default StylishCard1