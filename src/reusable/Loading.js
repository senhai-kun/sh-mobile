import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'
import Shimmer from 'react-native-shimmer'

const styles = StyleSheet.create({ 
    root: {
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1
    },
    font: {
        fontSize: 15,
        color: '#79C7F5'
    }
 })

export default function Loading() {
    return( 
        <View style={styles.root} >
            <ActivityIndicator size="large" color="#79C7F5" />
            <Shimmer>
                <Text style={styles.font} >Loading...</Text>
            </Shimmer>
        </View>
    )
}

