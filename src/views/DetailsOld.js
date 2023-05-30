import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { Episode } from '../reusable/Episode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../reusable/Loading';
import Button from '../reusable/Button'
import { color } from '../settings/colors'
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl } from '../settings/baseUrl'

const styles = StyleSheet.create({
    topContainer: {
        height: 320
    },
    imgBackground: {
        width: '100%',
        height: Dimensions.get('window').height
    },
    mask: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    titleImageContainer: {
        // position: 'absolute',
        // bottom: '0%',
        // flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 30
    },
    img: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginLeft: 5    
    },
    titleContainer: {
        width: '50%',
        marginLeft: 5,
        marginTop: 20
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    subtitle: {
        opacity: 0.9,
        fontSize: 13,
        textAlign: 'center'
    },
    readmoreText: {
        // marginTop: 10,
        color: 'lightblue',
        width: 150,
        alignSelf: 'flex-end'
    },
    summaryContainer: {
        paddingLeft: 5,
    },
    summary: {
        flexDirection: 'row', 
        alignContent: 'center', 
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },  
    summaryText: {
        lineHeight: 21,
        fontSize: 14,
        opacity: 0.8
    },
    genreContainer: {
        padding: 5,
        marginTop: 5
    },
    genre: {
        padding: 10, 
        // paddingLeft: 15,
        // paddingRight: 15,
        // backgroundColor: '#C70039', 
        borderRadius: 50, 
        marginLeft: 10, 
        marginRight: 5 
    },
    navigationContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backBtn: {
        marginLeft: 20,

    }
})

export default function Details({ route }) {
    const navigation = useNavigation()
    const { id } = route.params;

    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [bookmark, setBookmark] = useState(false)
    const [genre, setGenre] = useState([])

    useEffect( () => {
        const c = axios.CancelToken.source();
        axios.get(`${baseUrl}details/${id}`)
        .then( res => {
            setDetails(res.data.results)
            setLoading(false)
            let genres = []
            let arr = res.data.results[0].genres.split(',')
            for (let i = 0; i < arr.length; i++) {
                genres.push({ genre: arr[i]});
            }
            setGenre(genres)
        })
        .catch( err => console.log(err.response.status))

        return () => c.cancel('unmounted')
    }, [])

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    },[]);

    return loading ? <Loading /> : (
        <ScrollView 
            bounces={true}
            // onScroll={ () => console.log("scrolling")}
        >   
            <View  >
                {details.map( (anime, index) => (
                    <View key={index} >
                        <View style={styles.topContainer} >
                            <ImageBackground
                                source={{
                                    uri: anime.image
                                }}
                                imageStyle={styles.imgBackground}
                                style={styles.imgBackground}
                                fadeDuration={1000}
                                blurRadius={2}

                            >
                                <View style={styles.mask} >

                                    <View style={styles.navigationContainer} >
                                        <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.backBtn} >
                                            <Icon name="arrow-back" color="#fff" size={35} />
                                        </TouchableOpacity>

                                        <IconButton
                                            icon={ bookmark ? 'bookmark' : 'bookmark-outline'}
                                            size={30}
                                            onPress={() => setBookmark(!bookmark)}
                                            animated
                                            color={color.blue}
                                        />

                                    </View>

                                    <View style={styles.titleImageContainer} >
                                        <Image 
                                            source={{ uri: anime.image }}
                                            style={styles.img}
                                            fadeDuration={1000}
                                        />
                                        <View style={styles.titleContainer} >
                                            {/* <Text style={styles.title} numberOfLines={3} >{anime.title}</Text> */}
                                            {/* <Text>{anime.Othername}</Text> */}
                                            {/* <Text style={styles.subtitle} >Status: {anime.status.trim()}</Text>
                                            <Text style={styles.subtitle} >Year: {anime.relased}</Text>
                                            <Text style={styles.subtitle} >Genre: {anime.genres}</Text>
                                            <Text style={styles.subtitle} numberOfLines={2} >Alt: {anime.Othername}</Text> */}
                                        </View>
                                    </View>
                                </View>
                                
                            </ImageBackground>
                            
                        </View>

                        <View style={{ alignSelf: 'center', width: 300 }} >
                            <Text style={styles.title} numberOfLines={3} >{anime.title}</Text>
                            {/* <Text style={styles.subtitle} >Year: {anime.relased}</Text>
                            <Text style={styles.subtitle} >Genre: {anime.genres}</Text> */}
                            <Text style={styles.subtitle} numberOfLines={2} >{anime.Othername}</Text>
                        </View>

                        {/* summary view sets the text to read more and read less */}
                        <View style={styles.summaryContainer} >
                        
                            <View style={styles.summary} >
                                <Text style={styles.summaryTitle} >Summary</Text>
                                {lengthMore ? 
                                    <TouchableOpacity activeOpacity={0.8} onPress={toggleNumberOfLines} style={{ flexDirection: 'row', marginRight: 15 }} >
                                        <Text style={{ fontSize: 15 }} >More</Text>
                                        <Icon name={textShown ? 'arrow-drop-up' : 'arrow-drop-down'} color="#fff" size={22} />
                                    </TouchableOpacity>
                                    :null
                                }
                            </View>
                            <Text
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 3}
                                style={styles.summaryText}
                            >
                                {anime.summary}
                            </Text>
                        </View>
                        
                        <ScrollView horizontal style={styles.genreContainer} showsHorizontalScrollIndicator={false} >
                            {genre.map( (anime,index) => (
                                <TouchableOpacity key={index}  activeOpacity={0.7}  > 
                                    <LinearGradient 
                                        // start={{x: 0.0, y: 0.5}} end={{x: 0.0, y: 1.0}}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        useAngle={true}
                                        // locations={[0,0.5,0.6]} , '#FF5733'
                                        colors={['#C70039', '#F6390B']}
                                        style={styles.genre}
                                    >
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }} >{anime.genre.trim(' ')}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ) )}

                        </ScrollView>
                        
                        <Episode title={anime.title} id={id} totalepisode={anime.totalepisode} image={anime.image} />

                    </View>
                ))}
            </View>
        </ScrollView>
    )
}