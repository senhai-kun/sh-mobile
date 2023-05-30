import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavorites } from '../../redux/favorites/action'
import { Empty } from './Empty'

const styles = StyleSheet.create({
    root: {
        // marginTop: 10
        width: Dimensions.get('screen').width
    },
    container: {
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(6,12,19)',
        flexDirection: 'row',
        width: '100%'
    },
    imgContainer: {
        width: '30%',
    },
    img: {
        width: 100,
        height: 120,
        borderRadius: 5
    },
    textContainer: {
        width: '68%',
        marginLeft: 5,
    },
    title: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14.5
    },
    subtitle: {
        opacity: 0.8,
        flex: 1
    },
    smallFont: {
        fontSize: 13
    },
    genres: {
        position: 'absolute',
        bottom: 0
    }
})

export default function Favorites() {
    const navigation = useNavigation()
    const favorites = useSelector( state => state.favorites )
    const dispatch = useDispatch()

    // console.log(favorites)

    return favorites.length == 0 ? <Empty /> :  (
        <ScrollView style={styles.root} >
            { favorites.map( (anime,index) => (
                <TouchableOpacity 
                    onPress={ () => navigation.navigate('Details', { id: anime.id }) }
                    onLongPress={ () => dispatch(deleteFavorites(anime.title)) } 
                    delayLongPress={5000}
                    style={styles.container} 
                    key={index} 
                >
                    <View style={styles.imgContainer} >
                        <Image 
                            source={{ uri: anime.image }}
                            style={styles.img}
                        />
                    </View>

                    <View style={styles.textContainer} >
                        <Text style={styles.title} numberOfLines={2} >{anime.title}</Text>

                        <View style={styles.subtitle} >
                            <Text style={styles.smallFont} >{anime.status}</Text>
                            <Text style={styles.smallFont} >{anime.released}</Text>
                            <Text style={styles.genres} numberOfLines={2} >{anime.genres}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )) }
        </ScrollView>
    )
}