import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, View, TouchableOpacity, AppState } from 'react-native'
import { Text } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { Empty } from './Empty'
import { deleteHistory } from '../../redux/history/action'

const styles = StyleSheet.create({
    root: {
        padding: 5
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
        marginBottom: 10
        // alignItems: 'center'
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    text: {
        width: '50%',
        marginLeft: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    icon: {
        alignSelf: 'center', 
        textAlign: 'right', 
        width: '18%'
    }
})

export default function History() {
    const navigation = useNavigation()
    const history = useSelector( state => state.history)
    const dispatch = useDispatch()



    // change seconds to video time format
    const convertTime = (time) => {
        if(Math.floor(time) >= 3600) {
            return ~~(time / 3600) + ":" + (~~(time / 60) % 60< 10 ? "0" : "") + ~~(time / 60) % 60 + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
        } else {
            return (~~(time / 60 )< 10 ? "0" : "") + ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
        }
    }
    
    return history.length == 0 ? <Empty /> : (
        <ScrollView style={styles.root}>
            {history.map( (i,index) => (
                <TouchableOpacity 
                    key={index} 
                    activeOpacity={0.6} 
                    style={styles.container} 
                    onPress={ () => navigation.push('Now Watching', { episode: i.episode, title: i.title, id: i.id, totalepisode: i.totalepisode, image: i.image, resumetime: i.time })} 
                    onLongPress={ () => dispatch(deleteHistory(i.title)) }
                    delayLongPress={5000}
                >
                    <Image 
                        source={{ uri: i.image }}
                        style={styles.image}
                    />
                    <View style={styles.text} >
                        <Text style={styles.title} numberOfLines={2} >{i.title}</Text>
                        <Text>Episode {i.episode}</Text>

                        <Text >Left at {convertTime(Math.floor(i.time))}</Text>
                    </View>

                    <FontAwesome5 style={styles.icon} name='play' color='#fff' size={20} />
                </TouchableOpacity>
            ))}
            {/* <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={ () => console.log({ arr: history, l: history.length})} >
                <Image 
                    source={{ uri: 'https://gogocdn.net/cover/tensei-shitara-slime-datta-ken-2nd-season.png' }}
                    style={styles.image}
                />
                <View style={styles.text} >
                    <Text style={styles.title} numberOfLines={2} >Tensei shitara Slime Datta Ken 2nd Season</Text>
                    <Text>Episode 12</Text>

                    <Text >Left at 12:59</Text>
                </View>

                <FontAwesome5 style={styles.icon} name='play' color='#fff' size={20} />
            </TouchableOpacity> */}
        </ScrollView>
    )
}