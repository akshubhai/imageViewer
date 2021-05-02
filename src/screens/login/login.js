import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Login.css'


const styles = {
    card: {
        padding: '16px',
        position: 'relative',
        top: '95px',
        left: '50%',
        width: '350px',
        transform: 'translateX(-60%)',
    },
    title: {
        fontSize: 24
    }
};

class login extends Component{
    
    //Write the constructor to define initial state of login object
    constructor(){
        super();
        this.state = {
            userName : "",
            userNameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            incorrectUsernamePassword: "dispNone",
            logInStatus : sessionStorage.getItem('access-token') == null ? false:true

        }
    }

    //redirect to home page
    goToHome = () =>{
        this.props.history.push('/home');
    }

    //Input password change handler
    passwordChangeHandler = (e) =>{
        this.setState({password: e.target.value});
    }

    //Input userName change handler
    userNameChangeHandler = (e) =>{
        this.setState({userName: e.target.value});
    }

    


}