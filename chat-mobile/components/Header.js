import React from "react";
import { Container, Header, Title, View, Button, Icon, Left, Right, Body } from "native-base";
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import { Colors } from "../config";

export default ({ title, onBack}) => {
    //mine
    return (
        <View style={styles.container}>
            <Header style={styles.header}>
            <Left>
                <Title style={styles.left}>{title}</Title>
            </Left>
            
            <Right>
                <Button transparent onPress={onBack}>
                    <Icon name='arrow-forward' />
                </Button>
            </Right>
            </Header>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLACK,
    },
    header: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.BLACK,
        marginTop: Constants.statusBarHeight,
    },
    left: {
        marginLeft: 25,
    },
    
});
