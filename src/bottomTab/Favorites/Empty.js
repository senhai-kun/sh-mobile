import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const Empty = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }} >
            <Text style={{ fontSize: 18, textAlign: 'center' }} >Mark your anime as favorites.</Text>
        </View>
    )
}