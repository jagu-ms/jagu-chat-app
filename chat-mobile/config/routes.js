import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PasswordScreen from '../screens/PasswordScreen';


let config = {headerMode: "none"};

export default createAppContainer(
    createSwitchNavigator({
        Guest: createStackNavigator({
            login: LoginScreen,
            signup: SignUpScreen,
        }, config),
        Auth: createStackNavigator({
            home: HomeScreen,
            chat: ChatScreen,
            profile: ProfileScreen,
            editProfile: EditProfileScreen,
            password: PasswordScreen
        }, config)
    }, config)
);