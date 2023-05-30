import React from 'react'
import { ImageBackground, ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import hutao from '../../assets/hutao.jpg'
import VideoSettings from './VideoSettings'
import About from './About'
import { styles } from './styles'
import WebUpdates from './WebUpdates';
import { useSelector } from 'react-redux';
import { Website } from './Website';

export default function Settings() {
    const state = useSelector( state => state)
    // console.log(state)

    return (
        <ScrollView bounces={true} >
            <ImageBackground 
                source={hutao}
                style={styles.imgBackground}
                imageStyle={styles.imgBackground}
                fadeDuration={1000}
            >
                <View style={styles.darken} >
                    <View style={styles.textContainer} >
                        {/* <Text style={styles.senhai} >Senhai v1.1</Text> */}
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.settingsWrapper} >
                <View>
                    <Text style={styles.senhai} >Senhai v1.2</Text>
                </View>

                <Divider style={{ backgroundColor: 'grey', marginTop: 5 }} />

                {/* settings section */}
                <View  >
                    <WebUpdates />
                    <Divider style={{backgroundColor: 'white', margin: 5}} />

                    <VideoSettings />
                    <Divider style={{backgroundColor: 'white', margin: 5}} />
                    
                    <Website />
                    <Divider style={{backgroundColor: 'white', margin: 5}} />

                    <About />
                </View>
            </View>
        </ScrollView>
    );
}