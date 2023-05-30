import React from 'react'
import { View } from 'react-native'
import { CustomButton, Title } from './reusable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Website = () => {
    return(
        <View>
            <Title 
                icon={<FontAwesome name='globe' size={20} color="grey" />}
                title='Website'
            />
            <CustomButton 
                title={'Visit Us'}
                color={'#79C7F5'}
                variant={'contained'}
                onPress={ () => Linking.openURL('https://senpaikouhai.github.io/senhai/#/')}
            />
        </View>
    )
}