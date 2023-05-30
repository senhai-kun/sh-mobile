import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native-paper';
import StackView from '../views/StackView';
import DrawerContent from './DrawerContent';
import Home from '../views/Home';
import ScheduleTab from '../bottomTab/Schedule/ScheduleTab';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return(
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} /> } initialRouteName="Home" >
            <Drawer.Screen 
                name="StackView" 
                component={StackView} 
            />
            <Drawer.Screen name='sched' component={ScheduleTab} options={{ header: true }} />
            {/* <Drawer.Screen name="Settings" component={Settings} /> */}
        </Drawer.Navigator>
    )
}