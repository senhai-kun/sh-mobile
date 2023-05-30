import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StackView from '../views/StackView';
import Home from '../views/Home';
import { useDispatch, useSelector } from 'react-redux';
import { tabSelect } from '../redux/action';
import Settings from './Settings/Settings'
import Bookmark from './Bookmark';
import { Text } from 'react-native-paper';
import { Dimensions, View } from 'react-native';
import ScheduleTab from './Schedule/ScheduleTab';
import History from './History/History';
import Favorites from './Favorites/Favorites';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNav() {
    const dispatch = useDispatch()
    const isUpdated = useSelector( state => state.settings.isUpdated)
    return(
        <Tab.Navigator  activeColor="#f0edf6"  >
          <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              tabBarColor: '#121212'
            }} 
            listeners={{
              tabPress: e => {
                // Prevent default action
                dispatch(tabSelect('Home'))
              },
            }}
          />
          {/* <Tab.Screen 
              name="Schedule" 
              component={ScheduleTab} 
              options={{
                tabBarLabel: 'Schedule',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="schedule" color={color} size={26} />
                ),
                tabBarColor: '#EC4210'
              }} 
              listeners={{
                tabPress: e => {
                  // Prevent default action 900C3F 2A96D5
                  dispatch(tabSelect('Schedule'))
                },
              }}
            
            /> */}
          <Tab.Screen 
              name="History" 
              component={History} 
              options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="history" color={color} size={26} />
                ),
                tabBarColor: '#EC4210'
              }} 
              listeners={{
                tabPress: e => {
                  // Prevent default action 900C3F 2A96D5
                  dispatch(tabSelect('History'))
                },
              }}
            
            />
          <Tab.Screen 
              name="Favorites" 
              component={Favorites} 
              options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="heart" color={color} size={26} />
                ),
                tabBarColor: '#900C3F',
                
              }} 
              listeners={{
                tabPress: e => {
                  // Prevent default action 900C3F 2A96D5
                  dispatch(tabSelect('Favorites'))
                },
                
              }}
            />
          <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <View style={{ display: 'flex', flexDirection: 'row' }} >
                  <Octicons name="settings" color={color} size={26}/>
                  { !isUpdated && <View style={{ width: 10, height: 10, backgroundColor: 'red', paddingLeft: 5, borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2 }} />}
                </View>
              ),
              tabBarColor: '#078AD3',

            }} 
            listeners={{
              tabPress: e => {
                // Prevent default action
                dispatch(tabSelect('Settings'))
              },
            }}
          />
        </Tab.Navigator>
    )
}