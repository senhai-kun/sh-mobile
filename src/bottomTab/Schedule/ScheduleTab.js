import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } from './Days';

const Tab = createMaterialTopTabNavigator();

export default function ScheduleTab() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = days[ new Date().getDay() ];
    return (
        <Tab.Navigator 
            initialRouteName={day} 
            lazy={true} 
            swipeEnabled={true} 
            swipeVelocityImpact={0.6} 
            tabBarOptions={{scrollEnabled:true}} 
        >
            <Tab.Screen name="Monday" component={Monday} />
            <Tab.Screen name="Tuesday" component={Tuesday} />
            <Tab.Screen name="Wednesday" component={Wednesday} />
            <Tab.Screen name="Thursday" component={Thursday} />
            <Tab.Screen name="Friday" component={Friday} />
            <Tab.Screen name="Saturday" component={Saturday} />
            <Tab.Screen name="Sunday" component={Sunday} />
        </Tab.Navigator>
    )
}