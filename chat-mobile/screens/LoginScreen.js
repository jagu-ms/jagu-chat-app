import React, {Component} from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { Strings } from "../config";
import strings from '../config/strings';

export default class LoginScreen extends Component {

    navTorSignUp = () => this.props.navigation.navigate('signup', {msg: "hello"});

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.innerText}>{Strings.LOGIN}</Text>
                <Button onPress={this.navTorSignUp} title={strings.SIGNUP} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    innerText: {
        color: "#F0F8FF"
    }
});