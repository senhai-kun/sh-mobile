import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import bg from '../assets/hutao1.jpg'

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    darken: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
    },
    textContainer: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        borderRightColor: 'lightblue',
        borderRightWidth: 1.4,
        overflow: 'hidden'
    },
    text: {
        fontSize: 20,
        color: '#79C7F5',
        marginRight: 10,
        textAlign: 'right',
    }
})

export default function Introduction() {
    return(
        <View>
            <ImageBackground
                source={bg}
                style={styles.imgBackground}
                imageStyle={styles.imgBackground}
                fadeDuration={1000}
            >
                <View style={styles.darken} >
                    <View style={styles.textContainer} >
                        <View style={styles.animateContainer} >
                            <Text style={styles.text} >Welcome to Senhai</Text>
                            <Text style={styles.text} >Available on Web and Mobile</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}