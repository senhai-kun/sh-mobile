import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const Empty = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 18 }} >Delete Your History By a Long Press.</Text>
        </View>
    )
}