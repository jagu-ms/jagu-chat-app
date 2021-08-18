import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import Error from 'components/Error';
import Logo from 'assets/logo.png'; 
import Auth from 'Auth';
import axios from 'axios';

class Register extends React.Component {
    state = {name: "", username: "", password: "", error: ""}

    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });

    onSubmit = e => {
        e.preventDefault();
        let data = {
            name: this.state.name, 
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/api/auth/register', data)
        .then(res => {
            Auth.login(res.data);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({error: err.response.data.message});
        });
        
    }

    render() {
        return (
        <Card className="auth  col-sm-6 col-lg-3 px-2 ">
            <Form onSubmit={this.onSubmit}>
                <img src={Logo} alt="" width="200" />
                <h5 className="mb-4">Create Account</h5>
                <Error error={this.state.error}/>
                <Input value={this.state.name} name="name" onChange={this.onChange} placeholder="name" required autoFocus />
                <Input value={this.state.username} name="username" onChange={this.onChange} placeholder="username" required />
                <Input type="password" value={this.state.password} name="password" onChange={this.onChange} placeholder="password" required />
                <Button color="primary" block className="mb-3"> sign up </Button>
                <br/>
                <small><Link to="/login">log in</Link></small>
                <p className="m-3 text-muted">&copy; { new Date().getFullYear() }</p>
            </Form>
        </Card>
        );
    }
}

export default Register;