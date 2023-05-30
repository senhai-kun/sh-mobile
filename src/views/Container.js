import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Button, Text } from 'react-native-paper'
import HorizontalScroll from '../components/HorizontalScroll';
import { useNavigation } from '@react-navigation/native';
import Loading from '../reusable/Loading';
import { baseUrl } from '../settings/baseUrl'

const styles = StyleSheet.create({
    root: {
    //   backgroundColor: '#121212',
      padding: 2,
      marginTop: 5,
      marginBottom: 5
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontFamily: 'OpenSans-Bold'
        // fontWeight: 'bold',
        // color: "#bce6ff"
    },
    subtitle: {
        opacity: 0.8,
        fontSize: 13
    }
});

const Container = ({ component, isRefresh, title, subtitle }) => {
    const navigation = useNavigation()
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)
 
    const url = `${baseUrl}${component}/1`
    useEffect( () => {
        setLoading(true)
        const c = axios.CancelToken.source();
        axios.get(url)
        .then( res => {
            // console.log(res.data)
            setAnime(res.data.results.slice(0,10))
            setLoading(false)
        })
        .catch( err => console.log(err))

        return () => c.cancel('unmount axios')

    }, [isRefresh])

    const OnLoading = () => {
        return(
            <View style={{ height: 100, marginTop: 30, backgroundColor: '#121212' }} >
                <Loading />
            </View>
        )
    }
    return(
        <View style={styles.root} >
            <SafeAreaView>
                <View style={styles.titleWrapper} >
                    <View style={styles.titleContainer} >
                        <Text style={styles.title} >{title}</Text>
                        <Text style={styles.subtitle} >{subtitle}</Text>
                    </View>
                    <Button color='#BB2A1A' mode='text' onPress={() => navigation.navigate( component == 'recentlyadded' ? 'Recently Added List' : component == 'popular' ? 'Popular List' : 'Ongoing List')} >See All</Button>
                </View>
            </SafeAreaView>
            {loading ? <OnLoading /> : <HorizontalScroll navigation={navigation} anime={anime} component={component} />}
            

        </View>
    )
}

export default Container