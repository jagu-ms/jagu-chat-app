import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';

let config = {headerMode: "none"};

export default createAppContainer(
    createStackNavigator({
        login: LoginScreen,
        home: HomeScreen,
        signup: SignUpScreen
    }, config)
);