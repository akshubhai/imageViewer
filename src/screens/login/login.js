import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = {
    card: {
        padding: '15px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '325px',
        transform: 'translateX(-50%)',
    },
    title: {
        fontSize: 20
    }
};

class Login extends Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            usernamePasswordIncorrect: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    /* Event  Handler Functions Definitions */

    loginClickHandler = () => {

        let mockUsernameInstagram = "testingupgrad2021";
        let mockPasswordInstagram = "hello1234";
        //let accessToken = "set your access token here";
        let accessToken = "IGQVJWdHBXZAm1mNTlteWVGSGpqZAkJDckZAEdWV6ZA2swM0MteWV2QU9YWDA1eUUtQkE2d2NJZAEhINmxWQWx6TEVkX1JLeGp6WlE2TTJTbEZAyMzFNOFMza2Rld0kydkxyZAkJqRXc1V0QwODFkczc5a2xkRWV6dTRsRjNQQms4";

        if (this.state.username === mockUsernameInstagram && this.state.password === mockPasswordInstagram) {
            window.sessionStorage.setItem("access-token", accessToken);
            
            this.props.history.push('/home/');

        }

        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        (this.state.username !== "") & (this.state.password !== "") & (this.state.username !== mockUsernameInstagram || this.state.password !== mockPasswordInstagram) ? this.setState({ usernamePasswordIncorrect: "dispBlock" }) : this.setState({ usernamePasswordIncorrect: "dispNone" });

    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    /* Rendering JSX elements on the Login Page as per the design requirements */

    render() {

        return (

            <div className="main-container">
                <Header heading="Image Viewer"  screen={"Login"}/>
                <br /><br />
                    <Card style={styles.card}>
                        <CardContent>
                            <Typography variant="title" style={styles.title} >LOGIN</Typography><br/><br/>
                            <FormControl required style={{width: '100%'}}>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required style={{width: '100%'}}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                                <br />
                                <FormHelperText className={this.state.usernamePasswordIncorrect}><span className="red">Incorrect username and/or password</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                    </Card>
                </div>
        
        )
    }
}

export default Login;