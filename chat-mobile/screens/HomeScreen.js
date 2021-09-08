import React, {Component} from 'react';
import { Container, Content, List } from 'native-base';
import { HomeHeader, Contact } from '../components';
import {Auth, Strings} from '../config';
import { withChatContext} from '../context/ChatProvider';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        };
        this._init();
    }

    // Connect to the server.
    _init = async () => {
        let socket = await this.props.chat.connect();
        socket.on('error', this.onSocketError);
        this.props.chat.loadUserAccount();
    }

    onSocketError = async error => {
        if(err === 'auth_error'){
            await Auth.logout();
            this.props.navigation.navigate('login');
        }
    }

    onMenuClick = () => this.props.navigation.navigate('editProfile');

    onContactClick = contact => {
        this.props.chat.setCurrentContact(contact);
        this.props.navigation.navigate("chat");
    };

    onSearchChange = search => this.setState({search});

    renderContact = (contact, i) => {
        if(!contact.name.includes(this.state.search)) return null;
        contact = this.setMessageAndCounter(contact);
        return (
            <Contact key={i} contact={contact} onClick={this.onContactClick} />
        );
    }

    setMessageAndCounter = contact => {
        let messages = this.props.chat.messages.filter(
            e => e.sender === contact.id || e.receiver === contact.id
        );
        contact.lastMessage = messages[messages.length - 1];
        contact.counter = messages.filter(e => !e.seen && e.sender === contact.id).length;
        return contact;
    }

    render() {
        return (
            <Container >
                <HomeHeader 
                    title={Strings.TITLE_CONTACTS}
                    onSearchChange={this.onSearchChange}
                    onMenuClick={this.onMenuClick}
                />
                <Content>
                    <List>
                        {this.props.chat.contacts.map((contact, i) => this.renderContact(contact,i))}
                    </List>
                </Content>
            </Container>
        );
    };
}

export default withChatContext(HomeScreen);