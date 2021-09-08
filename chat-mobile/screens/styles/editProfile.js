import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../config'

const styles = StyleSheet.create({
    avatarContainer: {
        backgroundColor: Colors.GRAY,
        padding: 30,
    },
    //mine
    container: {
        backgroundColor: Colors.BLACK,
        color: Colors.WHITE,
    },
    form: {
        margin: 20
    },
    inputItem: {
        marginBottom: 20,
    },
    input: {
        textAlign: "right",
        color: Colors.WHITE
    },
    button: {
        marginBottom: 20
    }
});

export default styles;