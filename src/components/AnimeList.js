import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, TouchableOpacity, View, Image, StyleSheet, FlatList } from 'react-native'
import { Divider, Text } from 'react-native-paper'

const styles = StyleSheet.create({
    root: {
        flexWrap: 'wrap',
        flexDirection: 'row', 
        flex: 0.5,
        marginTop: 5
    },
    item: {
        width: '50%',
        flexGrow: 1,
        padding: 4,
        marginBottom: 5,
        // flexDirection: 'row'
    },
    img: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 5
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'OpenSans-SemiBold',
        color: "#bce6ff"
    },
    episode: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.8
    }
})

export default function AnimeList({ anime, component }) {
    const navigation = useNavigation()
    console.log(component)
    return (
        <View >
            <View style={styles.root}  >
            {anime.map( (anime, index) => (
                <TouchableOpacity activeOpacity={0.5} key={index} style={styles.item} onPress={ () => component == 'recentlyadded' ? navigation.navigate('Now Watching', { episode: anime.episodenumber, title: anime.title, id: anime.id, totalepisode: anime.episodenumber, image: anime.image }) : navigation.navigate('Details', { id: anime.id }) } >
                    <View>
                        <Image 
                            source={{
                                uri: anime.image
                            }}
                            style={styles.img}
                            fadeDuration={1000}
                        />
                        <Text style={styles.title} >{anime.title}</Text>
                        {component == 'recentlyadded' && <Text style={styles.episode} >Episode {anime.episodenumber}</Text>}
                    </View>
                </TouchableOpacity>
            ) )}
            </View>
            <Divider style={{backgroundColor: 'grey', marginTop: 5}} />

        </View>
    )
}