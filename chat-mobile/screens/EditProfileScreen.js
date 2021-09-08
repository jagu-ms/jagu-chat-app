import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Container, Content, Input, Item, Button, Text, Toast, View, Form, Label } from 'native-base';
import { withChatContext } from "../context/ChatProvider";
import {Strings, Axios, Auth, Urls} from "../config";
import { Header, Avatar } from "../components";
import styles from "./styles/editProfile";
import * as ImagePicker from 'expo-image-picker';

class EditProfileScreen extends Component {

    constructor(props) {
        super(props);
        let user = props.chat.account;
        this.state = {
            name: user.name,
            about: user.about,
            avatar: user.avatar
        }
    }

    onNameChange = name => this.setState({ name });

    onAboutChange = about => this.setState({ about });

    handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });
        if(!result.cancelled){
            this.setState({ avatar: result });
        }
    }

    validate(){
        Keyboard.dismiss();
        if(!this.state.name){
            Toast.show({ text: Strings.NAME_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.about){
            Toast.show({ text: Strings.ABOUT_REQUIRED, type: 'danger'});
            return false;
        }
        return true;
    }

    send = async () => {
        if(!this.validate()) return;
        let { name, about, avatar } = this.state;
        const data = new FormData();
        data.append('name', name);
        data.append('about', about);
        if(avatar instanceof Object){
            /* if the value of avatar is an object, means that it's not a string,
            this means this value is produced from launchImageLibraryAsync function.Now we 
            need to get the photo extension 'uri', so that we gonna devide it with split
            and get the last item with pop from the produced array */
            let fileType = avatar.uri.split('.').pop();
            data.append('avatar', {
                uri: avatar.uri,
                name: `avatar.${fileType}`,
                type: `image/${fileType}`
            });
        }
        try{
            Axios.defaults.headers.common.Authorization = await Auth.getToken();
            await Axios.post(Urls.UPDATE_PROFILE, data);
            Toast.show({ text: Strings.PROFILE_UPDATED, type: 'success' });
        } catch (e) {
            Toast.show({ text: e.response.data.message, type: 'danger' });
        }
    }

    // Logout process.
    logout = async () => {
        await Auth.logout();
        this.props.chat.logout();
        this.props.navigation.navigate('login');
    }

    navToPassword = () => this.props.navigation.navigate('password');

    onBackClick = () => this.props.navigation.goBack(null);


    render(){
        return(
            <Container style={styles.container}>
                <Header title={Strings.TITLE_MY_ACCOUNT}
                // mine
                    onBack={this.onBackClick}
                />
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <Content >
                        <View style={styles.avatarContainer}>
                            <TouchableOpacity onPress={this.handleChoosePhoto}>
                                <Avatar type='profile' source={this.state.avatar} />
                            </TouchableOpacity>
                        </View>
                        <Form style={styles.form}>
                            <Item style={styles.inputItem} floatingLabel>
                                <Label>{Strings.NAME_PLACEHOLDER}</Label>
                                <Input
                                    style={styles.input}
                                    value={this.state.name}
                                    onChangeText={this.onNameChange}
                                />
                            </Item>
                            <Item style={styles.inputItem} floatingLabel>
                                <Label>{Strings.ABOUT_PLACEHOLDER}</Label>
                                <Input
                                    style={styles.input}
                                    value={this.state.about}
                                    onChangeText={this.onAboutChange}
                                />
                            </Item>
                            <Button rounded danger block style={styles.button} onPress={this.send}>
                                <Text>{Strings.SAVE}</Text>
                            </Button>
                            <Button rounded bordered light block style={styles.button} onPress={this.navToPassword}>
                                <Text>{Strings.CHANGE_PASSWORD}</Text>
                            </Button>
                            <Button rounded bordered light block style={styles.button} onPress={this.logout}>
                                <Text>{Strings.LOGOUT}</Text>
                            </Button>
                        </Form>
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    }

}

export default withChatContext(EditProfileScreen)