import React from 'react';
import { StyleSheet } from 'react-native';
import { w, h } from '../../api/Dimensions';
import { Colors } from '../../config'

const styles = StyleSheet.create({
    containerColor: {
        backgroundColor: Colors.BLACK,
        color: Colors.WHITE
    },
    logoContainer: {
        backgroundColor: Colors.GRAY
    },
    logo: {
        alignSelf: 'center',
        width: w(50),
        height: h(20),
        marginTop: h(10),
        marginBottom: h(10),
    },
    icon: {
        color: Colors.WHITE
    },
    title:{
        color: Colors.WHITE,
        fontSize: 26,
        marginBottom: 20
    },
    input: {
        height: 45,
        textAlign: "right",
        marginLeft: 50,
        color: Colors.WHITE
    },
    form: {
        alignItems: 'center',
        textAlign: 'center',
        margin: 20
    },
    inputItem: {
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default styles;