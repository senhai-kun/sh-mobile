import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { styles } from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Setting, Title } from './reusable'
import { useDispatch, useSelector } from 'react-redux'
import { autoFullscreen, autoPlayOnLoad, skipIntroButton } from '../../redux/userPreferences/action'

const VideoSettings = () => {
    const dispatch = useDispatch()
    const userPref = useSelector( state => state.userPref )

    return (
        <View>
            <Title 
                icon={<MaterialIcons name='settings' size={20} color="grey" />}
                title='Video Settings'
            />
            <View style={{ padding: 5, marginLeft: 5, marginRight: 5 }} >
                <Setting title='Auto Fullscreen' settings={userPref.autoVideoFullscreen ? 'On' :  'Off'} onPress={ () => dispatch(autoFullscreen(!userPref.autoVideoFullscreen)) } />
                <Setting title='Auto Play on Load' settings={userPref.autoPlayOnLoad ? 'On' :  'Off'} onPress={ () => dispatch(autoPlayOnLoad(!userPref.autoPlayOnLoad)) } />
                <Setting title='Skip OP/ED Button' settings={userPref.skipIntroButton ? 'On' :  'Off'} onPress={ () => dispatch(skipIntroButton(!userPref.skipIntroButton)) } />
            </View>
        </View>
    )
}

export default VideoSettings