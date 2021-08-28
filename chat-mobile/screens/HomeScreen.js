import React, {Component} from 'react';
import { Container, Content, List } from 'native-base';
import { HomeHeader, Contact } from '../components';
import {Strings} from '../config';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                {id: 1, name: '1'},
                {id: 2, name: '2'},
                {id: 3, name: '3'},
                {id: 4, name: '4'}
            ],
            messages: [
                {sender: 4, receiver: 1, content: 'hello'},
                {sender: 2, receiver: 4, content: 'hello'}
            ]
        }
    }

    onContactClick = contact => {
        console.log(contact.name);
    }

    renderContact = (contact, i) => {
       // if(!contact.name.includes(this.state.search)) return null;
        contact = this.setMessageAndCounter(contact);
        return (
            <Contact key={i} contact={contact} onClick={this.onContactClick} />
        );
    }

    setMessageAndCounter = contact => {
        let messages = this.state.messages.filter(
            e => e.sender === contact.id || e.receiver === contact.id
        );
        contact.lastMessage = messages[messages.length - 1];
        contact.counter = messages.filter(e => !e.seen && e.sender === contact.id).length;
        return contact;
    }

    render() {
        return (
            <Container>
                <HomeHeader title={Strings.TITLE_CONTACTS} />
                <Content>
                    <List>
                        {this.state.contacts.map((contact, i) => this.renderContact(contact,i))}
                    </List>
                </Content>
            </Container>
        );
    };
}