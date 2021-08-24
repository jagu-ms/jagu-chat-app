import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Strings } from "../config";

export default class SignUpScreen extends Component {

    construtor(props){
        let msg = props.navigation.getParam('msg');
        alert(msg);
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.innerText}>{Strings.LOGIN}</Text>
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