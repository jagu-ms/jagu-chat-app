import  React from "react";
//import native base elements with brackets {}.
// and if the compoent was exported without "default" you need the brackets {} when importing
import { Container, Icon } from 'native-base';
import { withChatContext } from "../context/ChatProvider";
import styles from './styles/Chat';
// Don't ecapsulate the component if it was exported with "default"
// ... ChatHeader and its instances are ecapsulated because they are exproted in index without default keyword
import { ChatHeader } from "../components";
import { GiftedChat, InputToolbar} from  "react-native-gifted-chat";
import { KeyboardAvoidingView } from "react-native";
import { Strings, Moment } from '../config';

class ChatScreen extends React.Component {

    state = {
        message: "",
        lastType: false
    }

    componentWillUnmount(){
        this.props.chat.setCurrentContact({});
    };

    onMessageChange = message => {
        this.setState({ message });
        // Sending the typing status to the server.
        if(!this.state.lastType || Moment() - this.state.lastType > 2000){
            this.setState({ lastType: Moment()});
            this.props.chat.sendType();
        }
    }


    onSend = () => {
        let content = this.state.message.trim();
        if(!content) return;
        this.setState({ message: "", lastType: false});
        this.props.chat.sendMessage(content);
    }

    onBackClick = () => this.props.navigation.goBack(null);

    onProfileClick = () => this.props.navigation.navigate('profile');

    render() {
        let { account, contact } = this.props.chat;
        let status = this.props.chat.status();
        let messages = this.props.chat.messages.filter(
            e => e.sender === contact.id || e.receiver === contact.id
        );

        return (
            <Container>
                <ChatHeader 
                    contact={contact}
                    onBack={this.onBackClick}
                    onProfile={this.onProfileClick}
                    status={status}
                />

                <GiftedChat
                    user={{_id: account.id}}
                    messages={messages.reverse()}
                    text={this.state.message}
                    onInputTextChanged={this.onMessageChange}
                    renderInputToolbar={this.renderInputToolbar}
                    renderAvatar={null}
                />
                <KeyboardAvoidingView behavior="padding" enabled />
            </Container>
        );
    }

    renderInputToolbar = props => {
        props.placeholder = Strings.WRITE_YOUR_MESSAGE;
        props.textInputStyle = styles.input;
        props.renderSend = this.renderSend;
        return <InputToolbar {...props} />
    }

    renderSend = () => <Icon name="paper-plane" onPress={this.onSend} style={styles.send} />
}

export default withChatContext(ChatScreen);    
    
/* <Container>
        <ChatHeader 
            contact={contact}
            onBack={this.onBackClick}
            onProfile={this.onProfileClick}
        />
    </Container> */