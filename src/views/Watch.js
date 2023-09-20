import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AppState, StatusBar, ScrollView, Dimensions, View, useWindowDimensions, BackHandler, ImageBackground, RefreshControl, TouchableWithoutFeedback, Animated, ActivityIndicator, TouchableOpacity, Image, FlatList } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import Video from 'react-native-video'
import Loading from '../reusable/Loading'
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetectNavbar from 'react-native-detect-navbar-android';
import Button from '../reusable/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toastOnce, videoFullScreen } from '../redux/action'
import { HDNotAvailableAlert } from '../settings/Toast';
import ame from '../assets/ame.gif'
import { styles, episodeStyle, bottomControls, centerControls } from './watchStyles'
import LinearGradient from 'react-native-linear-gradient'
import Slider from '@react-native-community/slider';
import { color } from '../settings/colors'
import DoubleClick from 'react-native-double-tap';
import { saveHistory } from '../redux/history/action';
import { headerBackPressed } from '../redux/settings/action';
import { baseUrl } from '../settings/baseUrl'
import Relations from '../components/Relations';

export default function Watch({ route }) {

    const { id, title, episode, totalepisode, image, resumetime } = route.params

    /// videoPlayer useRef to get things from video player
    const videoPlayer = useRef(null)
    
    // handles the stack navigation
    const navigation = useNavigation()
    const window = useWindowDimensions()
    
    const userPref = useSelector( state => state.userPref )
    const sett = useSelector( state => state.userSettings )
    const dispatch = useDispatch()    

    const [link, setLink] = useState('')
    const [currentEpisode, setCurrentEpisode] = useState(episode)
    const [quality, setQuality] = useState('')
    const [loading, setLoading] = useState(true)
    const [isNavBar, setIsNavbar] = useState(false)
    const [navHeight, setNavHeight] = useState(0)
    const [videoLoad, setVideoLoad] = useState(false)
    const [buffering, setBuffering] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [onNextVideo, setOnNextVideo] = useState(false)

    // video player controls state
    const [currentTime, setCurrentTime] = useState(0);
    const [resumeTime, setResumeTime] = useState(resumetime)
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(true);

    useEffect( () => {
        // detects the mobile bottom navigation called soft bar to set the video size when fullscreen
        DetectNavbar.hasSoftKeys().then( (bool) => {
            if(bool) {
                setIsNavbar(true)
                const screenHeight = Dimensions.get('screen').height;
                const windowHeight = Dimensions.get('window').height;
                const navbarHeight = screenHeight - windowHeight;
                setNavHeight(navbarHeight)
            } else {
                console.log('No soft navbar')
            }
        })
        return () => console.log(" unmount detect nav bar ")
    }, [])

    useEffect( () => {
        // initialize axios token on fetch
        const c = axios.CancelToken.source();

        try {
            axios.get(`${baseUrl}watching/${id}/${currentEpisode}`)
        .then( res => {
            console.log(res)
            // console.log(res.data.links[0].link)
            // if(res.data.hd !== "") {
            setLink(res.data.results)
            setQuality("HD")
            // } else {
            //     setLink(`${res.data.alt}`)
            //     setQuality("ALT")
            // }
            // setQuality(res.data.links[0].name)
            setCurrentTime(resumeTime == undefined ? 0 : resumeTime)
            setDuration(0)
            // setPaused(false)
            setIsLoading(true)
            setVideoLoad(false)
            setLoading(false)
            // reload component when user use refresh control
            if ( res.data.results === "" ) {
                setRefresh(true)
            } else {
                setRefresh(false)
            }
            // res.data.links[0].name != '(HDP - mp4)' ? HDNotAvailableAlert() : null
        })
        } catch (err) {
            if(err.response.status !== 200) {
                // navigation.goBack()
                console.log(err)
            }
            console.log(err)
        }
     
        return () => c.cancel('unmounted')

    }, [currentEpisode,refresh])

    // check appstate for saving history 
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    let history = {
        image: image,
        title: title,
        id: id,
        episode: currentEpisode,
        totalepisode: totalepisode,
        time: currentTime,
        duration: duration
    }

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
    
        return () => AppState.removeEventListener("change", handleAppStateChange);
    }, [])
    
    const handleAppStateChange = (nextAppState) => {
        if(AppState.currentState === 'background') {
            dispatch(saveHistory(history))
            setPaused(true)
        }
        // if(AppState.currentState === 'inactive') dispatch(saveHistory(history))
        if(appState.current.match(/inactive|background/) && nextAppState === "active") {
            // runs when the user goes back to app after background
            console.log("App has come to the foreground!");
            setPaused(true);
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        // console.log("AppState", appState.current);
    }
    // console.log(appStateVisible)

    useEffect( () => {
        console.log(appState.current)
        if(AppState.currentState === 'background' || AppState.currentState === 'inactive') dispatch(saveHistory(history))
    }, [AppState.currentState])

    const onExitFullScreen = () => {
        setIsFullScreen(false)
        return true
    }

    useEffect( () => 
        navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;
            e.preventDefault()
            dispatch(saveHistory(history))
            console.log('asdasd')
            navigation.dispatch(action)
        })
    , [navigation, currentTime])

    useEffect( () => {
        // settings for video when its on fullscreen hide some components
        if(isFullScreen) {
            StatusBar.setHidden(true, "fade")
            Orientation.lockToLandscape()
            BackHandler.addEventListener("hardwareBackPress", onExitFullScreen)
            // dispatch if fullscreen to hide header bar from navigation
            dispatch(videoFullScreen(true))
        } else {
            // console.log(currentTime)
            StatusBar.setHidden(false, "fade")
            Orientation.lockToPortrait()
            
            dispatch(videoFullScreen(false))
        }

        return () => {
            console.log('destroyed orientaion')
            BackHandler.removeEventListener("hardwareBackPress", onExitFullScreen)

        }
    }, [isFullScreen])

    // video custom controls
    let animated = useRef(new Animated.Value(0)).current;
    const [videoPress, setVideoPress] = useState(false)

    const interpolatedControlsBottom = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 0],
    });
    const interpolatedControlsTop = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [ isFullScreen ? -65 : -60, 0 ]
    });
    

    const handleVideoPress = () => {
        setVideoPress(!videoPress)
        videoPress ? triggerShow() : triggerFastHide()
    };

    const triggerFastHide = () => {
        setTimeout(() => {
            Animated.timing(animated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }, 200);
    }

    const triggerHide = () => {
        setTimeout(() => {
            Animated.timing(animated, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true
            }).start();
        }, 5000);
    }

    const triggerShow = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();

        setTimeout(() => {
            Animated.timing(animated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }, 8000);
    };
    
    // common video controls
    const onPlay = () => {
        setPaused(!paused) 
        // videoPlayer.current.setNativeProps({
        //     paused: true
        // })
        !paused ? triggerHide() : null
        if(userPref.autoVideoFullscreen && paused && !isFullScreen) setIsFullScreen(true)
        if(paused) {
            setTimeout(() => {
                Animated.timing(animated, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start();
            }, 2500)

        }
        console.log(videoPlayer.current.paused)
    }

    const onLoad = (data) => {
        if(resumeTime == undefined) {
            videoPlayer.current.seek(0)
        } else {
            videoPlayer.current.seek(resumeTime)
        }
        setDuration(data.duration)
        setIsLoading(false)
        setBuffering(false)
        triggerShow();
        setIsFullScreen(true)
        if(userPref.autoPlayOnLoad) {
            setIsFullScreen(true) 
            setPaused(false) 
            triggerHide()
        }
    }
    const onLoadStart = () => {
        setOnNextVideo(false)
        setIsLoading(true)
        setBuffering(true)
    }
    const onReadyForDisplay = () => {
        setLoading(false)
        setBuffering(false)
        // setIsFullScreen(true)
    }
    const onProgress = ({ currentTime, playableDuration, seekableDuration }) => {
        setCurrentTime(currentTime)
        if(seekableDuration - currentTime < 1){
            setBuffering(true)
            setPaused(false)
        }
        // console.log(data)
        setBuffering(false)
    } 
    const onEnd = () => {
        setPaused(true)
        setBuffering(false)
        setOnNextVideo(true)
        setResumeTime(0)
        totalepisode != currentEpisode ? setTimeout( () => {
            setCurrentEpisode(currentEpisode+1)
            setOnNextVideo(false)
            setVideoLoad(true)
        }, 3000) : setIsFullScreen(false)
    }

    // video seek options
    const onStartSeeking = () => {
        setPaused(false)
    }
    const onSeeking = (seeking) => {
        // videoPlayer.current.seek(seeking);
        setCurrentTime(seeking)
    }
    const onSeek = (seek) => {
        videoPlayer.current.seek(seek);
        setCurrentTime(seek)
        setPaused(false)
    }
    const onFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    };
    const seekAdd = () => {
        videoPlayer.current.seek(currentTime+10)
        setCurrentTime(currentTime+10)
        setPaused(false)
    }
    const seekMinus = () => {
        videoPlayer.current.seek(currentTime-10)
        setCurrentTime(currentTime-10)
        setPaused(false)
    }
    const skipIntro = () => {
        videoPlayer.current.seek(currentTime+90)
        setCurrentTime(currentTime+90)
    }
    const onNextEpisode = () => {
        setCurrentEpisode(currentEpisode+1)
        setResumeTime(0)
        setVideoLoad(true)
    }
    const onPrevEpisode = () => {
        setCurrentEpisode(currentEpisode-1)
        setResumeTime(0)
        setVideoLoad(true)
    }

    // buffer options
    const onBuffer = () => {
        setBuffering(true)
    }
    const onFinishedBuffer = () => {
        setBuffering(false)
    }

    // convert duration from seconds to minutes or hours and on video time format
    const videoDurationTime = duration >= 3600 ? 
        ~~(duration / 3600) + ":" + (~~(duration / 60) % 60< 10 ? "0" : "") + ~~(duration / 60) % 60 + ":" + (duration % 60 < 10 ? "0" : "") + ~~duration % 60
        : 
        ~~(duration / 60) + ":" + (~~(duration % 60) < 10 ? "0" : "") + ~~duration % 60

    // convert timelapse from seconds to minutes or hours and on video time format
    const secondsToTime = (time) => {
        if(Math.floor(duration) >= 3600) {
            return ~~(time / 3600) + ":" + (~~(time / 60) % 60< 10 ? "0" : "") + ~~(time / 60) % 60 + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
        } else {
            return (~~(time / 60 )< 10 ? "0" : "") + ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
        }
    }

    // episode list 
    const [asc, setAsc] = useState(false)
    const epList = () => {
        let L = [];
        for (var i = totalepisode, k = 0; i >= 1; i--, k++) {
            L[k] = i;
        }
        return L;
    };
    const renderEpisode = () => {
        let arr = [];
        let ep = episode

        if( totalepisode <= 24 ) {
            for (var i = totalepisode, k = 0; i >= 1; i--, k++) {
                arr[k] = i;
            }
            return arr;
        } else {
            // cut episode that has more than 24 episode to lessen render problems 
            for (var i = 12, k = 0; i >= 1; i--, k++) {
                arr[k] = i;
            }
            return arr;
        }
    }
    
    const onPickEpisode = () => {
        setVideoLoad(true)
        scrollToTop()
        setResumeTime(0)
    } 
    
    // const renderItem = ({ item, index }) => (<Episode item={item} index={index} image={image} currentEpisode={currentEpisode} onPress={onPickEpisode} ep={setCurrentEpisode()}  />)

    // scroll to top
    const scroll = useRef(null)
    const scrollToTop = () => {
        scroll.current.scrollTo({x: 0, y: 0, animated: true})
    }

    return loading ? <Loading /> : (
        <View style={{ flex: 1 }} >
            { videoLoad ? 
                <View style={isFullScreen ? {width: window.width + navHeight, height: window.height} : styles.video} >
                    <ImageBackground 
                        source={ame}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                :
                <View style={{ overflow: 'hidden' }} >
                    <TouchableWithoutFeedback onPress={handleVideoPress} >
                        <Video 
                            source={{ uri: link }}
                            style={isFullScreen ? {width: window.width + navHeight, height: window.height} : styles.video}
                            // paused={paused ? true : false }
                            paused={paused}
                            resizeMode={'contain'}
                            onProgress={onProgress}
                            onLoad={onLoad}
                            onLoadStart={onLoadStart}
                            onPlaybackStalled={onBuffer}
                            onPlaybackResume={onFinishedBuffer}
                            onBuffer={onBuffer}
                            ref={videoPlayer}
                            fullscreen={isFullScreen}
                            onReadyForDisplay={onReadyForDisplay}
                            onEnd={onEnd}
                            
                        />
                    </TouchableWithoutFeedback>

                    {/* invisible seeker double tap */}
                    <View style={centerControls.seekMinusContainer} >
                        <DoubleClick
                            singleTap={handleVideoPress}
                            doubleTap={seekMinus}
                            delay={200}          
                        >
                            <View style={centerControls.toBePressedScreen} >
                                <View style={{ padding: isFullScreen ? 150 : 80 }} >
                                </View>
                            </View>
                        </DoubleClick>
                    </View>
                    <View style={centerControls.seekAddContainer} >
                        <DoubleClick
                            singleTap={handleVideoPress}
                            doubleTap={seekAdd}
                            delay={200}
                        >
                            <View style={centerControls.toBePressedScreen} >
                                <View style={{ padding: isFullScreen ? 140 : 80  }} >
                                </View>
                            </View>
                        </DoubleClick>
                    </View>
                    

                    {/* loading buffer */}
                    {buffering && 
                        <View style={centerControls.buffer} >
                            <ActivityIndicator size="large" color={color.blue} />
                            <Text style={{ color: color.blue, marginLeft: 5 }} >Loading..</Text>
                        </View>
                    }

                    {/* when the video ended play the next episode */}
                    { onNextVideo && 
                        <TouchableWithoutFeedback onPress={handleVideoPress} >
                            <View style={centerControls.nextVideo}  >
                                {totalepisode == currentEpisode ?                           
                                    <Text style={centerControls.lastEpisode} ></Text>
                                    : 
                                    <View>
                                        <Text style={{ color: '#14D3FF', fontSize: 15 }} >Loading Next Episode...</Text>
                                        <ActivityIndicator color='#14D3FF' />
                                    </View>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    {/* top video controls */}
                    <Animated.View
                        style={[{ 
                            width: '100%', 
                            position: 'absolute', 
                            top: 0, 
                            height: isFullScreen ? 65 : 60,
                            // backgroundColor: 'rgba(43,51,63,.8)',
                            backgroundColor: "rgba(0,0,0,.5)",
                            alignContent: 'center',
                            // alignItems:'center'
                            }, 
                            { transform: [{ translateY: interpolatedControlsTop }] } 
                        ]} 
                    >
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                            <View style={{ padding: 5, width: '70%', marginLeft: 5 }} >
                                <Text style={{ fontSize: isFullScreen ? 16 : 14.5, fontFamily: 'OpenSans-BoldItalic' }} numberOfLines={2} >{title}</Text>
                                <Text style={{ fontSize: isFullScreen ? 14 : 13, opacity: 0.6 }} >Episode: {currentEpisode}</Text>
                            </View>

                            <View style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
                                <View>
                                    {isFullScreen && userPref.skipIntroButton &&
                                        <TouchableOpacity onPress={skipIntro} >
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                                <Text style={{ textAlign: 'right' }} >Skip 1:30</Text>
                                                <MaterialCommunityIcons name='skip-forward' color='#fff' size={25} />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View>
                                    <TouchableOpacity disabled={totalepisode == currentEpisode ? true : false} onPress={onNextEpisode} >
                                        <View style={{ display: 'flex', flexDirection: 'row', marginRight: 10, alignItems: 'center', alignSelf: 'flex-end', opacity: totalepisode == currentEpisode ? 0.7 : 1 }} >
                                            <Text >Next</Text>
                                            <Icon style={{ textAlign: 'center',  opacity: totalepisode == currentEpisode ? 0.7 : 1 }} name='skip-next' size={30} color='white' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animated.View>


                    {/* bottom video background controls */}
                    <Animated.View 
                        style={[
                            bottomControls.animatedView, 
                            { transform: [{ translateY: interpolatedControlsBottom }] } 
                        ]}      
                    >
                        <View style={bottomControls.bottomContainer} >
                            <View style={{ width: isFullScreen ? '5%' : '10%' }} >
                                <TouchableWithoutFeedback onPress={onPlay} >
                                    <Icon style={{textAlign: 'center'}} name={paused ? 'play-arrow' : 'pause' } color='#fff' size={25} />
                                </TouchableWithoutFeedback>
                            </View>

                            {/* video time and slider */}
                            <View style={[ { width: isFullScreen ? '80%' : '70%' }, bottomControls.timeAndSliderContainer]} >
                                <Text style={{ width: isFullScreen ? '10%' : '20%',textAlign: 'center' }}>
                                    {secondsToTime(~~((currentTime / duration) * duration))}
                                </Text>
                                
                                <Slider 
                                    style={{ width: isFullScreen ? '80%' : '60%' }}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor={color.blue}
                                    maximumTrackTintColor="white"
                                    value={currentTime}
                                    onSlidingStart={onStartSeeking}
                                    // onValueChange={onSeeking}
                                    onSlidingComplete={onSeek}
                                    thumbTintColor={color.blue}
                                    animateTransitions={true}
                                    
                                /> 

                                <Text style={{ width: isFullScreen ? '10%' : '20%', textAlign: 'center' }}  >{videoDurationTime}</Text>
                            </View>

                            { isFullScreen && 
                                <View style={{ width: '5%', display: 'flex', flexDirection: 'row' }} >
                                    {/* <View style={{  width: '50%'  }} >
                                        <TouchableWithoutFeedback  onPress={onPlay} >
                                            <Icon style={{ }} name='replay-10' color='#fff' size={23} />
                                        </TouchableWithoutFeedback>
                                    </View> */}
                                    <View style={{ }} >
                                        <TouchableWithoutFeedback onPress={seekAdd} >
                                            <Icon style={{ }} name='forward-10' color='#fff' size={25} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            }

                            <View style={{ width: isFullScreen ? '5%' : '10%' }} >
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }} >{quality}</Text>
                            </View>
                            
                            
                            <View style={{ width: isFullScreen ? '5%' : '10%'}} >
                                <TouchableOpacity onPress={onFullScreen} >
                                    <Icon style={{textAlign: 'center'}} name={ isFullScreen ? 'fullscreen-exit' : 'fullscreen'} color='#fff' size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            }

            <ScrollView ref={scroll} nestedScrollEnabled={true} style={ isFullScreen && styles.hide } >       
                {/* episode controller */}
                <View style={{ margin: 5, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View>
                    { currentEpisode - 1 != 0 && 
                        <TouchableOpacity onPress={onPrevEpisode} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <MaterialCommunityIcons name='arrow-left-drop-circle' size={15} color='#fff' />
                            <Text style={{ marginLeft: 5, fontFamily: 'OpenSans-SemiBold' }} >Episode {currentEpisode - 1}</Text>
                        </TouchableOpacity>
                    }
                    </View>

                    { Number(currentEpisode) != Number(totalepisode) && 
                        <TouchableOpacity onPress={onNextEpisode} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ marginRight: 5, fontFamily: 'OpenSans-SemiBold' }} >Episode {Number(currentEpisode)+1}</Text>
                            <MaterialCommunityIcons name='arrow-right-drop-circle' size={15} color='#fff' />
                        </TouchableOpacity>
                    }
                </View>
                <View style={isFullScreen ? styles.hide : styles.titleContainer } >

                    <View style={styles.titleAndEpisode} >
                        <TouchableOpacity activeOpacity={0.6} onPress={ () => navigation.navigate('Details',{ id: id })} >
                            <Text style={styles.title} numberOfLines={2} >{title}</Text>
                        </TouchableOpacity>
                        <Text style={styles.episode} >Total Episode: {totalepisode}</Text>
                    </View>

                    <View style={{ width: '30%' }} >
                        <TouchableOpacity activeOpacity={0.5} onPress={ () => {setLoading(true),setRefresh(true)}} >
                            <Icon name="refresh" style={{ textAlign: 'right', marginRight: 20 }} color={color.blue} size={28} />
                        </TouchableOpacity>
                    </View>

                </View>

                <Divider style={ isFullScreen ? styles.hide : { backgroundColor: 'grey', marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 5 }} />

                {/* relation container */}
                <View style={ isFullScreen ? styles.hide : episodeStyle.container } >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', marginBottom: 20}} >
                        <Text style={episodeStyle.title} >Relations</Text>
                    </View>
                    <Relations title={title} />
                </View>
            </ScrollView>
        </View>
    )
}