import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions, StatusBar } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { Episode } from '../reusable/Episode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../reusable/Loading';
import Button from '../reusable/Button'
import { color } from '../settings/colors'
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl } from '../settings/baseUrl'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorites, saveFavorites } from '../redux/favorites/action';

const styles = StyleSheet.create({
    topContainer: {
        height: 320
    },
    imgBackground: {
        width: '100%',
        // height: Dimensions.get('window').height
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
        paddingTop: 20,
    },
    img: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginLeft: 5    
    },
    titleContainer: {
        width: '85%',
        marginTop: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 21,
        // fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold'
    },
    subtitle: {
        opacity: 0.9,
        fontSize: 11,
        textAlign: 'center',
        fontFamily: 'OpenSans-Light'
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
        fontFamily: 'OpenSans-Bold',
    },  
    summaryText: {
        lineHeight: 21,
        fontSize: 14,
        opacity: 0.8,
        marginRight: 5
    },
    genreContainer: {
        padding: 5,
        marginTop: 2
    },
    genre: {
        padding: 10, 
        // paddingLeft: 15,
        // paddingRight: 15,
        backgroundColor: 'rgba(43,51,63,.4)', 
        borderRadius: 50, 
        marginLeft: 10, 
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // borderColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.5,
    },
    navigationContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backBtn: {
        marginLeft: 20,
    },
    navBtn: {
        flexDirection: 'row'
    }
})

export default function Details({ route }) {
    const { id } = route.params;

    const navigation = useNavigation()
    const favoriteList = useSelector( state => state.favorites )
    const dispatch = useDispatch()
    const window = useWindowDimensions()

    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    // const [bookmark, setBookmark] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [genre, setGenre] = useState([])

    useEffect( () => {
        const c = axios.CancelToken.source();
        axios.get(`${baseUrl}details/${id}`)
        .then( res => {
            setDetails(res.data.results)
            favoriteList.filter( i => i.id === id ).length != 0 ? setFavorite(true) : setFavorite(false)
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

    const isTitleExistOnFavorites = () => {
        if (favorites.filter( i => i.id === id ).length != 0) {
            return true
        } else {
            return false
        }
    }

    return loading ? <Loading /> : (
        <View>
            {details.map( (anime,index) => (
                <View key={index} >
                    <ImageBackground
                          source={{
                            uri: anime.image,
                            height: window.height
                        }}
                        imageStyle={styles.imgBackground}
                        style={styles.imgBackground}
                        fadeDuration={1000}
                        blurRadius={2}

                    >
                        <View style={styles.mask} >
                            <View style={styles.navigationContainer} >
                                <TouchableOpacity onPress={ () => navigation.goBack() } style={styles.backBtn} >
                                    <Icon name="keyboard-backspace" color="#fff" size={25} />
                                </TouchableOpacity>

                                <View style={styles.navBtn} >
                                    <IconButton
                                        icon={ favorite ? 'heart' : 'heart-outline'}
                                        size={25}
                                        onPress={() => {
                                            if(!favorite) {
                                                setFavorite(true)
                                                let a = {
                                                    title: anime.title,
                                                    image: anime.image,
                                                    id: id,
                                                    totalepisode: anime.totalepisode, 
                                                    released: anime.type, 
                                                    genres: anime.genres, 
                                                    status: anime.status.trim(),
                                                    othername: anime.Othername,
                                                    summary: anime.summary
                                                }
                                                dispatch(saveFavorites(a))
                                            } else {
                                                setFavorite(false)
                                                dispatch(deleteFavorites(anime.title))
                                            }
                                        }}
                                        animated
                                        color='#F00F05'
                                        style={{ marginRight: 10 }}
                                    />

                                    {/* <IconButton
                                        icon={ bookmark ? 'bookmark' : 'bookmark-outline'}
                                        size={25}
                                        onPress={() => setBookmark(!bookmark)}
                                        animated
                                        color={color.blue}
                                    /> */}
                                </View>
                            </View>

                            <ScrollView bounces={true} nestedScrollEnabled={true} >
                                <View style={styles.titleImageContainer} >
                                    <Image 
                                        source={{ uri: anime.image }}
                                        style={styles.img}
                                        fadeDuration={1000}
                                    />
                                    <View style={styles.titleContainer} >
                                        <Text style={styles.title} numberOfLines={2} >{anime.title}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}} >
                                            <View style={{ padding: 5, backgroundColor: 'rgba(43,51,63,.4)', borderRadius: 5, marginRight: 10, flexDirection: 'row', alignItems: 'center' }} >
                                                <MaterialCommunityIcons style={{ marginRight: 2 }} name="circle" color="#3498DB" size={11} />
                                                <Text style={styles.subtitle} numberOfLines={3} >{anime.status.trim()}</Text>
                                            </View>
                                            <View style={{ padding: 5, backgroundColor: 'rgba(43,51,63,.4)', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }} >
                                                <MaterialCommunityIcons style={{ marginRight: 2 }} name="circle" color="#3498DB" size={11} />
                                                <Text style={styles.subtitle} numberOfLines={3} >{anime.type}</Text>
                                            </View>
                                            {/* <View style={{ padding: 5, backgroundColor: '#154360', borderRadius: 5 }} >
                                                <Text style={styles.subtitle} numberOfLines={3} >{anime.status.trim()}</Text>
                                            </View> */}
                                        </View>
                                    </View>

                                    {/* <Text style={{ fontSize: 13, opacity: 0.8, color: '#AED6F1' }} >Ongoing</Text> */}
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
                                            {/* <LinearGradient 
                                                // start={{x: 0.0, y: 0.5}} end={{x: 0.0, y: 1.0}}
                                                // start={{ x: 0, y: 0 }}
                                                // end={{ x: 1, y: 1 }}
                                                // useAngle={true}
                                                // locations={[0,0.5,0.6]} , '#FF5733'
                                                colors={['#C70039', '#F6390B']}
                                                style={styles.genre}
                                            > */}
                                            <View style={styles.genre} >

                                                <View style={{height: 10 }} >
                                                    <MaterialCommunityIcons name="circle" color="#2ECC71" size={11} />
                                                </View>
                                            
                                                <Text style={{ fontSize: 13, fontWeight: 'bold' }} > {anime.genre.trim(' ')}</Text>
                                            </View>
                                            {/* </LinearGradient> */}
                                        </TouchableOpacity>
                                    ) )}

                                </ScrollView>
                                <Episode title={anime.title} id={id} totalepisode={anime.totalepisode} image={anime.image} />

                            </ScrollView>
                        </View>

                    </ImageBackground>
                </View>
            ))}
        </View>
    )
}