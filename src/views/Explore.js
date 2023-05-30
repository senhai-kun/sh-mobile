import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'react-native-paper'
import { useTheme } from 'react-native-paper';
import { genre } from '../settings/genre'

const styles = StyleSheet.create({
    root: {

    },
    title: {
        // padding: 10,
        fontSize: 18,
        // fontWeight: 'bold',
        // fontFamily: 'OpenSans-Italic'
    },
    subtitleContainer: {
        opacity: 0.7,
        marginBottom: 10
    },
    genreContainer: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20
    },
    btnContainer: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20
    },
    btnTxt: {
        // borderRadius: 20,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 1.5
    }
})

export default function Explore() {
    const navigation = useNavigation()
    const { fonts } = useTheme();

    const Genre = ({ name }) => {
        return(
            <TouchableOpacity style={{ marginLeft: 5, marginRight: 3 }} onPress={ () => navigation.navigate('Genre') } activeOpacity={0.8} >
                <LinearGradient 
                    style={styles.genreContainer} 
                    colors={[
                        '#943126', 
                        '#CB4335', 
                        '#E74C3C'
                    ]} 
                    useAngle={true}
                >
                    <Text >#{name}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.root} >
            <View style={{ padding: 10 }} >
                <Text style={[styles.title, fonts.thin]}  >Explore More</Text>

                <View style={styles.subtitleContainer} >
                    <Text>Having hard time on finding what to watch? Pick your favorite genre now!</Text>
                </View>

            </View>
            <TouchableOpacity onPress={ () => navigation.navigate('GenreList') } activeOpacity={0.8} >
                <LinearGradient 
                    style={styles.btnContainer} 
                    colors={[
                        '#CB4335', 
                        '#E74C3C', 
                        '#EC7063'
                    ]} 
                    useAngle={true}
                >
                    <Text style={styles.btnTxt} >Find Your Genre</Text>
                </LinearGradient>
            </TouchableOpacity>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
                {genre.list.map( (genre, index) => (<Genre name={genre} key={index} />))}

            </ScrollView> */}
        </View>
    )
}