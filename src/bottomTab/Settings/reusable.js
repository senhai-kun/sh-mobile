import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { styles } from './styles'
import Entypo from 'react-native-vector-icons/Entypo'

export const Title = ({ icon, title }) => {
    return (
        <View style={styles.settingsTitle} >
            {icon}
            <Text style={styles.settingsTitleText} >{title}</Text>
        </View>
    )
}

export const Setting = ({ title, settings, onPress }) => {
    return (
        <TouchableOpacity style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }} activeOpacity={0.5} onPress={onPress} >
            <View>
                <Text style={{ fontSize: 14.9 }} >{title}</Text>
                <Text style={{ opacity: 0.5 }} >{settings}</Text>
            </View>
            <Entypo name='chevron-right' color='#fff' size={22} />
        </TouchableOpacity>
    )
}

export const CustomButton = ({ icon, onPress, title, direction, color, variant }) => {
    return(
        <Button
            color={color}
            mode={variant}
            contentStyle={{flexDirection: direction}}
            icon={icon}
            onPress={onPress}
            style={{ marginBottom: 10, marginTop: 5, width: 200, alignSelf: 'center', zIndex: 1 }}
            
        >
            {title}
        </Button>
    )
}