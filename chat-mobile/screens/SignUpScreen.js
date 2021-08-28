import React, {Component} from 'react';
import { Keyboard, KeyboardAvoidingView, Image} from 'react-native';
import { Strings, Axios, Urls, Auth } from "../config";
import { Toast, Container, Content, View, Text, Item, Input, Icon, Button  } from 'native-base';
import styles from './styles/auth';
import companyLogo from '../assets/images/logo.png';
import { Loader } from '../components';


export default class SignUpScreen extends Component {
    constructor(props){
        super(props);
        this.state = { 
            name: '',
            username: '',
            password: '',
            isLoading: false
        }
    };

    onNameChange = name => this.setState({name});
    
    onUserNameChange = username => this.setState({username});

    onPosswordChange = password => this.setState({password});

    validate(){
        Keyboard.dismiss();
        if(!this.state.name){
            Toast.show({ text: Strings.NAME_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.username){
            Toast.show({ text: Strings.USERNAME_REQUIRED, type: 'danger'});
            return false;
        }
        if(!this.state.password){
            Toast.show({ text: Strings.PASSWORD_REQUIRED, type: 'danger'});
            return false;
        }
        return true;
    };

    signup = async () => {
        if(!this.validate()) return;
        let data = {
            name: this.state.name, username: this.state.username, password: this.state.password,
        };
        try{
            this.setState({ isLoading: true });
            let response = await Axios.post(Urls.SIGNUP, data);
            Auth.setUser(response.data);
            this.props.navigation.navigate('home');
            this.setState({ isLoading: false }); 
        } catch(e) {
            this.setState({ isLoading: false });
            Toast.show({ text: e.response?.data.message, type: 'danger'});
        }
    }


    backToLogin = () => this.props.navigation.navigate('login', {msg: "hello"});

    render() {
        return (
            <Container>
                <Loader title={Strings.PLEASE_WAIT} loading={this.state.isLoading} />
                <KeyboardAvoidingView behavior='padding' style={{flex: 1 }}>
                    <Content>
                        <View style={styles.logoContainer}>
                            <Image 
                                style={styles.logo}
                                source={companyLogo}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.title}>{Strings.TITLE_CREATE_NEW_ACCOUNT}</Text>
                            <Item rounded style={styles.inputItem}>
                                <Input 
                                    style={styles.input}
                                    placeholder={Strings.NAME_PLACEHOLDER}
                                    onChangeText={this.onNameChange}
                                />
                                <Icon name='person' style={styles.icon}/>
                            </Item>
                            <Item rounded style={styles.inputItem}>
                                <Input 
                                    style={styles.input}
                                    placeholder={Strings.USERNAME_PLACEHOLDER}
                                    onChangeText={this.onUserNameChange}
                                />
                                <Icon name='person' style={styles.icon}/>
                            </Item>
                            <Item rounded style={styles.inputItem}>
                                <Input 
                                    style={styles.input}
                                    placeholder={Strings.PASSWORD_PLACEHOLDER}
                                    secureTextEntry={true}
                                    onChangeText={this.onPosswordChange}
                                />
                                <Icon name='eye' style={styles.icon}/>
                            </Item>
                            <Button rounded info  style={styles.button} onPress={this.signup}>
                                <Text>{Strings.SEND}</Text>
                            </Button> 
                            <Button rounded bordered dark  style={styles.button} onPress={this.backToLogin}>
                                <Text>{Strings.BACK_TO_LOGIN}</Text>
                            </Button> 
                        </View>
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    };
}
