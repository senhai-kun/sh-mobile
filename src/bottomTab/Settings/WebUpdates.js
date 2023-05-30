import React, { useState } from 'react'
import { ActivityIndicator, Linking, ToastAndroid, View } from 'react-native'
import { Badge, Button, Divider, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'
import { CustomButton, Title } from './reusable'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { currentVersion } from '../../settings/version'
import { isUpdated as isVersionUpdatedAction } from '../../redux/action'
import { baseUrl } from '../../settings/baseUrl'

const WebUpdates = () => {
    const [fetching, setFetching] = useState(false)
    const [isUpdated, setIsUpdated] = useState(true)

    const dispatch = useDispatch()
    const isVersionUpdated = useSelector( state => state.settings.isUpdated )
    
    const checkUpdate = () => {
        setFetching(true)
        axios.get(`${baseUrl}download`)
        .then( res => {
            // console.log(res.data.v)
            if(currentVersion.version == res.data.v) {
                setIsUpdated(true)
                ToastAndroid.showWithGravityAndOffset(
                    "You Are Already Updated",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    40
                );
            } else {
                setIsUpdated(false)
                ToastAndroid.showWithGravityAndOffset(
                    "A New Update is Available",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    40
                );
            }
            setFetching(false)
            dispatch(isVersionUpdatedAction(true))
        })
    }

    return(
        <View>
            <View>
                <Title 
                    icon={<FontAwesome name='warning' size={20} color="grey" />}
                    title='Version Update'
                />
                <View>
                { isUpdated ? 
                    <View style={{ width: 200, alignSelf: 'center' }} >
                        <View style={{ zIndex: 0 }} >
                            <CustomButton 
                                title={ fetching ? 'Checking' : 'Check Update'}
                                variant={'contained'}
                                color={'#79C7F5'}
                                direction={'row-reverse'}
                                icon={ () => fetching ? <ActivityIndicator color="black" /> : <MaterialCommunityIcons name='check-all' size={20}  />} 
                                onPress={checkUpdate}
                            />
                        </View>
                        { !isVersionUpdated && <Badge size={16} style={{ position: 'absolute', top: 0, right: -7, zIndex: 2, backgroundColor: '#FF6162' }} />}
                    </View>
                    :
                    <CustomButton
                        title={'Update Available'}
                        color={"#FF5733"}
                        variant={'contained'}
                        direction={'row-reverse'}
                        icon={ () => <MaterialCommunityIcons name='alert' size={20} />}
                        onPress={ () => Linking.openURL('https://senpaikouhai.github.io/senhai/#/')}
                    />
                }
                </View>
            </View>
        </View>
    )
}

export default WebUpdates