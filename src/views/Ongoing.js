import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Loading from '../reusable/Loading'
import HorizontalScroll from '../components/HorizontalScroll'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#121212'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
  
})

function Ongoing() {
    const navigation = useNavigation()
    const [top, setTop] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        axios.get('https://api.jikan.moe/v3/season/2021/winter')
        .then( res => {
            // console.log(res.data.anime.slice(0,10))
            setTop(res.data.anime.slice(0,10))
            setLoading(false)
        })
        .catch( err => console.log(err))
    }, [])

    return loading ? <Loading /> : (
        <View style={styles.root} >
            <View style={styles.titleContainer} >
                <Text style={styles.title} >Ongoing Anime</Text>
                <Button color='#f55858' mode='text' onPress={() => navigation.navigate('OngoingList')} >See All</Button>
            </View>

            <HorizontalScroll anime={top} view={'Home'} />

        </View>
    )
}

export default Ongoing