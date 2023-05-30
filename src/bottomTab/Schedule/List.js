import React from 'react'
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import moment from 'moment-timezone'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { animeTitle } from '../../redux/action'
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    wrapper: {
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        flex: 1, 
    },
    item: {
        flexGrow: 1, 
        width: '50%',
        padding: 5
    },  
    img: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    title: {
        opacity: 0.9,
        fontSize: 15,
        padding: 5,
        textAlign: 'center',
        color: "#bce6ff"
    },
    timeContainer: {
        alignSelf: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // paddingLeft: 15,
        borderRadius: 5,
        width: 75
    },
    time: {
        fontSize: 15.5,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
})

export default function List({ anime }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const Time = ({ aired }) => {
        var time = moment.tz(aired, "Asia/Tokyo")
        return(
            <Text style={styles.time} >{time.format('LT') === 'Invalid date' ? 'To Be Announced' : time.format('LT')}</Text>
        )
    }
    // i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')
    const onSearch = () => {
        navigation.navigate('Search')
    }
    return(
        <SafeAreaView>
            <FlatList 
                data={anime}
                numColumns={2}
                keyExtractor={(item) => item.mal_id }
                centerContent
                disableVirtualization
                alwaysBounceVertical={true}
                renderItem={ ({ item }) => (
                    <View key={item.mal_id} style={{ flex: 0.5 }} >
                        <TouchableOpacity 
                            style={{ padding: 4 }} 
                            onPress={ () => {
                                navigation.navigate('Search')
                                dispatch(animeTitle(item.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))
                            }}  
                        >
                            <ImageBackground source={{ uri: item.image_url }} style={styles.img} imageStyle={styles.img} >
                                                                
                                <View style={styles.timeContainer} >
                                    {/* <LinearGradient style={{ borderBottomLeftRadius:10 }} colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.05)']} > */}
                                        <Time aired={item.airing_start} />
                                    {/* </LinearGradient> */}
                                </View>

                                <View style={styles.titleContainer} >
                                    <LinearGradient colors={['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.7)']} >
                                        <Text style={styles.title} numberOfLines={2} >{item.title}</Text>
                                    </LinearGradient>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
        // <ScrollView >
        //     <View style={styles.wrapper} >
        //         {anime.map( anime => (
        //             <TouchableOpacity 
        //                 activeOpacity={0.5} 
        //                 key={anime.title} 
        //                 style={styles.item}
        //                 onPress={ () => {
        //                     navigation.navigate('Search')
        //                     dispatch(animeTitle(anime.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))
        //                 }}  
        //             >
        //                 {/* {console.log(anime.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' '))} */}
        //                 <ImageBackground
        //                     source={{ uri: anime.image_url }}
        //                     // imageStyle={styles.img}
        //                     style={styles.img}
                            
        //                 >
        //                     <View style={styles.time} >
        //                         <Time aired={anime.airing_start} />
        //                     </View>

        //                     <View style={styles.titleContainer} >
        //                         <Text style={styles.title} numberOfLines={2} >{anime.title}</Text>
        //                     </View>
        //                 </ImageBackground>
        //             </TouchableOpacity>
        //         ))}
        //     </View>
        // </ScrollView>
    )
}