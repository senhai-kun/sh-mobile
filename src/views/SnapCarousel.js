import React, { useEffect, useRef, useState } from 'react'
import Carousel, { ParallaxImage,  } from 'react-native-snap-carousel';
import axios from 'axios';
import { baseUrl } from '../settings/baseUrl'
import Loading from '../reusable/Loading';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: 200
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    image: {
        width: 300,
        height: 200
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    title: {
        padding: 10,
        // fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold'
    }
})

export default function SnapCarousel() {
    const ref = useRef(null)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const window = useWindowDimensions()
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect( () => {
        const c = axios.CancelToken.source()
        let uri = `${baseUrl}ongoing/1`
        axios.get(uri)
        .then( res => {
            setList(res.data.results)
            setLoading(false)
        })

        return () => c.cancel()
    }, [])

    const card = ({ item, index }, pallaxProps) => {
        return(
            <TouchableOpacity activeOpacity={0.8} key={index} onPress={ () => navigation.navigate('Details', { id: item.id }) } >
                <View style={styles.root} >
                    <ParallaxImage 
                        source={{ uri: item.image }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0}
                        {...pallaxProps}
                        fadeDuration={1500}
                        
                    />
                    <LinearGradient style={styles.titleContainer} colors={['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.7)']} >
                        <Text style={styles.title} numberOfLines={2} >{item.title}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View >
            <View style={{ padding: 10 }} >
                <Text style={{ fontSize: 21, fontFamily: 'OpenSans-Bold' }} >Summer 2022</Text>
                <Text style={{ opacity: 0.8 }} >Ongoing Anime</Text>
            </View>
           { loading ? <Loading /> : 
                isFocused &&
                <Carousel 
                    ref={ref}
                    listKey={item => item.id}
                    data={list}
                    extraData={list}
                    renderItem={card}
                    hasParallaxImages={true}
                    sliderWidth={window.width}
                    itemWidth={280}
                    initialNumToRender={3}
                    removeClippedSubviews={true}
                    // loopClonesPerSide={2}
                    enableSnap={true}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                    inactiveSlideShift={10}
                    inactiveSlideOpacity={0.7}
                />
            }
        </View>
    )
}
