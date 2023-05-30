import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'
import { Title } from './reusable'

const About = () => {
    return(
        <View>
            <Title 
                icon={<MaterialCommunityIcons name='alert-circle' size={20} color="grey" />}
                title='About'
            />
            <View style={{ opacity: 0.8 }}>
                <Text>Watch Anime on HD without annoying and malicious ads on screen for free.</Text>
                <Text></Text>
                <Text>Notice: This App and the Website are built and being maintained only by me but I will try my best to update both app and website.</Text>
            </View>
        </View>
    )
}

export default About