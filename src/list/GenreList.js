import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { genre } from '../settings/genre'
import { genreName } from '../redux/action'

const styles = StyleSheet.create({
    root: {
        padding: 5
    },
    container: {
        // backgroundColor: '#CB4335',
        padding: 10,
        borderRadius: 20
    },
    img: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    mask: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%'
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'OpenSans-BoldItalic',
        fontSize: 19
    }
})

const GenreContainer = ({ item }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const handlePress = () => {
        dispatch(genreName(item.genre))
        navigation.navigate('Genre', { id: item.id, genre: item.genre }) 
    }
    return (
        <View style={styles.root} key={item.id} >
            <TouchableOpacity style={styles.container} onPress={handlePress} >
                <ImageBackground
                    source={{ uri: item.img }}
                    style={styles.img}
                    imageStyle={styles.img}
                    resizeMode="cover"
                    // blurRadius={5}
                >
                    <View style={styles.mask} >
                        <View style={styles.box} >
                            <Text style={styles.text} >{item.genre}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}
export default function GenreList() {
    const renderItem = ({ item }) => (<GenreContainer item={item} />)
    return (
        <View>
            <FlatList 
                data={genre}
                renderItem={renderItem}
                keyExtractor={ item => item.id}
                removeClippedSubviews={true}
            />
        </View>
    )
}