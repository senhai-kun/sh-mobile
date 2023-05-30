import React from 'react'
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import hutao from '../assets/hutao6.png'
import Shimmer from 'react-native-shimmer'

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    darken: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    comingSoon: {
        fontSize: 25,
        color: '#DE3E37',
        // fontWeight: 'bold'
    }
})

export default function Bookmark() {
    
    return (
        <Shimmer  >
            {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
            <ImageBackground
                source={hutao}
                style={styles.imgBackground}
                imageStyle={styles.imgBackground}
                fadeDuration={1000}
            >
                 <View style={styles.darken} >
                    <View style={styles.textContainer} >
                        {/* <Shimmer> */}
                            <Text style={styles.comingSoon} >Coming Soon...</Text>
                        {/* </Shimmer> */}
                    </View>
                </View>
            </ImageBackground>
        </Shimmer>
    );
}