import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { baseUrl } from '../settings/baseUrl'
import { StackActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    container:{
        width: 150,
        margin: 5,
        marginTop: 0
    },
    img: {
        height: 170,
        width: 150
    },
    title: {
        marginTop: 3,
        color: '#48C9B0'
        // fontFamily: 'OpenSans-SemiBold'
    }
})

export default function Relations({ title }) {
    const navigation = useNavigation()

    const [list, setList] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        axios.get(`${baseUrl}search/${title}/1`)
        .then( res => {
            setList(res.data.results)
            setLoading(false)
        })

    }, [])

    const handlePress = () => {
        navigation.dispatch(StackActions.replace('Details', { id: anime }))
    }

    const Loading = () => {
        return(
            <View style={{  }} >
                <Text style={{  }} >Loading Titles...</Text>
            </View>
        )
    }

    return loading ? <Loading /> : (
        <ScrollView horizontal >
            {list.map( (anime, index) => (
                <TouchableOpacity onPress={ () => navigation.dispatch(StackActions.replace('Details', { id: anime.id })) } activeOpacity={0.6} key={index} style={styles.container} >
                    <Image 
                        source={{ uri: anime.image }}
                        style={styles.img}
                    />
                    <Text style={styles.title} >{anime.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}