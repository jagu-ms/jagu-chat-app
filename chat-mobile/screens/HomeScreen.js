import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Strings } from "../config";

export default class HomeScreen extends Component {
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