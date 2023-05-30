import React from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator()

export default function GenreList() {
    return (
        <Tab.Navigator lazy={true} swipeEnabled={true} swipeVelocityImpact={0.6} tabBarOptions={{scrollEnabled:true}} >
            <Tab.Screen />
        </Tab.Navigator>
    )
}