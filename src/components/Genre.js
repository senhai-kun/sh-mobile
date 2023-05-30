import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../reusable/Loading'
import { baseUrl } from '../settings/baseUrl'
import { color } from '../settings/colors'


const styles = StyleSheet.create({
    root: {
        padding: 5
    },
    container: {
        width: '50%',
        padding: 8
    },
    img: {
        width: '100%',
        height: 220,
        borderRadius: 8,
        overflow: 'hidden'
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 50
    },
    text: {
        fontFamily: 'OpenSans-SemiBold',
        padding: 5
    }
})

const ListContainer = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={ () => navigation.navigate('Details', { id : item.id }) } >
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.img}
                imageStyle={styles.img}
                fadeDuration={1500}
            >
                <View style={styles.textContainer} >
                <LinearGradient colors={['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']} >
                    <Text style={styles.text} numberOfLines={3} >{item.title}</Text>
                </LinearGradient> 
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default function Genre({ route }) {
    const { id, genre } = route.params
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)

    let url = `${baseUrl}genre/${id}/${page}`

    useEffect( () => {
        const c = axios.CancelToken.source()

        axios.get(url)
        .then( res => {
            let listData = list
            let data = listData.concat(res.data.results)
            if(res.data.results.length == 0) {
                setError(true)
            }
            setList(data)
            setLoading(false)
        })
        .catch( err => {
            console.log(err)
            setError(true)
        })

        return () => c.cancel()
    }, [page])

    const renderItem = ({ item }) => (<ListContainer item={item} />)
    const renderLoading = () => (
        error ? 
        <Text style={{ textAlign: 'center', fontSize: 18, padding: 5, fontFamily: 'OpenSans-SemiBold', color: '#E74C3C' }} >No more...</Text>
        :
        <ActivityIndicator style={{ padding: 10 }} color={color.blue} size={30} />
    )

    const handleLoadMore = () => {
        setPage(page+1)
    }

    return loading ? <Loading /> : (
        <SafeAreaView style={styles.root} >
            <FlatList 
                data={list}
                extraData={list}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={ item => item.id}
                removeClippedSubviews={true}
                ListFooterComponent={renderLoading}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}
            />
        </SafeAreaView>
    )
}