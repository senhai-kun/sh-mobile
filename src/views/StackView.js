import React, { useEffect, useState } from 'react';
import StackAppBar from './StackAppBar';
import Home from './Home';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs  } from '@react-navigation/stack';
import OngoingList from '../list/OngoingList';
import RecentAddedList from '../list/RecentAddedList';
import PopularList from '../list/PopularList';
import Details from './Details';
import Watch from './Watch';
import { StatusBar } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Search from './Search';
import { SearchToolbar } from '../components/SearchToolbar';
import { useSelector } from 'react-redux';
import DrawerNav from '../drawer/DrawerNav';
import BottomNav from '../bottomTab/BottomNav';
import TabAppBar from '../bottomTab/TabAppBar';
import GenreList from '../list/GenreList';
import Genre from '../components/Genre';
import GenreAppBar from '../components/GenreAppBar';

const Stack = createStackNavigator();

const StackView = () => {
  const state = useSelector( state => state.settings.videofullscreen)

  useEffect( () => {
    // lock rotation to portrait, the app is still not good for landscape mode
    return Orientation.lockToPortrait()
  }, [])
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
      <Stack.Navigator initialRouteName='BottomTabHome' >
        <Stack.Screen 
          name="BottomTabHome" 
          component={BottomNav} 
          options={{
            header: (props) => <TabAppBar  />
            // headerShown: false
          }}
        />
        <Stack.Screen 
          name="Ongoing List" 
          component={OngoingList} 
          options={{ 
            header: (props) => <StackAppBar {...props} name={'Ongoing Anime'} />
          }}
          
        />
        <Stack.Screen 
          name="Recently Added List" 
          component={RecentAddedList} 
          options={{ 
            header: (props) => <StackAppBar {...props} name={'Recently Added'} />
          }}
        />
        <Stack.Screen 
          name="Popular List" 
          component={PopularList} 
          options={{ 
            header: (props) => <StackAppBar {...props} name={'Now Trending'} />
          }}
        />
        <Stack.Screen 
          name="GenreList" 
          component={GenreList} 
          options={{ 
            header: (props) => <StackAppBar {...props} name={'Genres'} />
          }}
        />
        <Stack.Screen 
          name="Genre" 
          component={Genre} 
          options={{ 
            header: (props) => <GenreAppBar {...props} />
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={{
            headerShown: false,
            // headerTransparent: true,
            transitionSpec: {
              open: config,
              close: config
            },
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,

          }}
          
        />
        <Stack.Screen 
          name="Now Watching" 
          component={Watch} 
          options={{ 
            headerShown: state ? false : true,

          }}
        />
        <Stack.Screen 
          name="Search" 
          component={Search} 
          options={{
            header: (props) => <SearchToolbar {...props} />
          }}
        />
      </Stack.Navigator>
  );
};

export default StackView;
