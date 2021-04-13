import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../Components/Home';
import MovieDetails from '../Components/MovieDetails';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        
      </Stack.Navigator>
    );
  }

// const AppNavigator = createStackNavigator({ 
//     "Home": Home, 
//     // "MovieDetails": MovieDetails, 
// });

export default AppNavigator;