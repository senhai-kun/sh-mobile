import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../settings/colors'
 
export const styles = StyleSheet.create({
    root: {

    },  
    fullscreenVideo: {
        height: Dimensions.get('window').width * 9 / 15,
        width: Dimensions.get('window').width,
        backgroundColor: '#303030',
    },
    video: {
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 5,
        marginTop: 5
    },
    titleAndEpisode: {
        width: '70%',
        padding: 5
    },
    hide: {
        display: 'none'
    },
    title: {
        fontSize: 16,
        // padding: 5,
        // fontWeight: 'bold',
        fontFamily: 'OpenSans-Bold',
        color: color.blue
    },
    episode: {
        fontSize: 15,
        opacity: 0.8,
        fontFamily: 'OpenSans-Light',
        // padding: 15
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    seekContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 3,
    },  
    seekBtn: {
        opacity: 0.7
    },
    nav: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 5
    }
})

export const bottomControls = StyleSheet.create({
    animatedView: {
        width: '100%', 
        position: 'absolute', 
        bottom: 0, 
        height: 40,
        // backgroundColor: 'rgba(43,51,63,.8)',
        backgroundColor: "rgba(0,0,0,.5)",
        alignContent: 'center',
        // alignItems:'center'
    },
    bottomContainer: {
        padding: 5,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center' ,
        // width: '100%',
    },
    timeAndSliderContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
})

export const centerControls = StyleSheet.create({
    buffer:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row'
    },
    nextVideo: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    lastEpisode: {
        fontSize: 15,
        color: "#14D3FF"
    },
    seekMinusContainer: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        // right: 0, 
        bottom: 0, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '50%',
        height: '100%'
    },  
    seekAddContainer: {
        position: 'absolute',
        top: 0, 
        // left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '50%',
        height: '100%'
    },  
    toBePressedScreen: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'grey'
    }

})

export const episodeStyle = StyleSheet.create({
    flatlist:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    container: {
        padding: 5
    },
    episodeContainer: {
        marginBottom: 10,
        backgroundColor: '#1A5276',
        marginLeft: 5,
        width: 75,
        height: 50
    },  
    title: {
        fontSize: 20,
        // marginBottom: 10,
        // fontWeight: 'bold',
        fontFamily: 'OpenSans-SemiBold',
        color: '#48C9B0'
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 10
    },
    episodeText: {
        // marginLeft: 10,
        fontSize: 15,
        fontFamily: 'OpenSans-SemiBold'
        // fontWeight: 'bold'
        // color: '#fff'
    }
})
