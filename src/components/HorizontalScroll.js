import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        padding: 5,
        height: 'auto',
        marginRight: 5
    },
    img: {
        width: '100%', 
        height: 200,
        borderRadius: 5,
        resizeMode: 'cover'
    },
    card: {
        width: 150,
        // maxHeight: 300
    },
    title: {
        fontSize: 14,
        // fontWeight: 'bold',
        // textAlign: 'center',
        marginTop: 5,
        maxHeight: 60,
        color: "#a8dee0",
        fontFamily: 'OpenSans-SemiBold'
    },
    episode: {
        fontSize: 13,
        // textAlign: 'center',
        marginTop: 5,
        opacity: 0.8
    }
})

export default function HorizontalScroll({ anime, component }) {
    const navigation = useNavigation()
    return(
        <ScrollView 
            horizontal 
            bounces={true}
            alwaysBounceHorizontal={true}
        >
            {anime.map( (anime, index) => (
                <View key={index} style={styles.container}  >
                    <TouchableOpacity activeOpacity={0.3} onPress={ () => component == 'recentlyadded' ? navigation.navigate('Now Watching', { episode: anime.episodenumber, title: anime.title, id: anime.id, totalepisode: anime.episodenumber, image: anime.image }) : navigation.navigate('Details', { id: anime.id } )} >
                        <View style={styles.card}  >
                            <Image
                                source={{ uri: anime.image }}
                                style={styles.img}     
                                fadeDuration={1000}                       
                            />
                            <Text style={styles.title} numberOfLines={2} >{anime.title}</Text>
                            {component == 'recentlyadded' ? <Text style={styles.episode} >Episode {anime.episodenumber}</Text> : null}
                        </View>
                    </TouchableOpacity>
                </View>
            ) )}
        </ScrollView>
    )
} 