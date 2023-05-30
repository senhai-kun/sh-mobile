import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Divider, Text } from 'react-native-paper';

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
    },
    epContainer: {
        paddingTop: 15,
        // alignSelf: 'center',
        // backgroundColor: 'grey',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row', 
        flex: 1
    }, 
    epWrapper: {
        width: '50%',
        flexGrow: 1,
    },
    eps: {
        margin: 5, 
        padding: 4,
        borderRadius: 20,
        
    }
})

export const Episode = ({ title, id, totalepisode, image }) => {
    const navigation = useNavigation()
    const epList = () => {
        let L = [];
        for (var i = totalepisode, k = 0; i >= 1; i--, k++) {
            L[k] = i;
        }
        return L;
    };
    
    const item = ({ item }) => {
        return (
            <View style={{ justifyContent: 'center', flex: 0.5 }} >
                <Button style={styles.eps} color='#900C3F' mode='contained' onPress={ () => navigation.push('Now Watching', { episode: item, title: title, id: id, totalepisode: totalepisode, image: image })} >
                    Episode {item}
                </Button>
            </View>
        )
    }

    return (
        <View style={{ paddingBottom: 30 }} >
            <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
                <Text style={styles.title} >Episodes - {totalepisode}</Text>
            {/* <Divider style={{ backgroundColor: 'white', marginBottom: 10 }} /> */}

            <FlatList 
                data={epList()}
                renderItem={item}
                numColumns={2}
                keyExtractor={(item) => item }
                // centerContent
                removeClippedSubviews={true}
                nestedScrollEnabled={true}
            />

        </View>
    )
}