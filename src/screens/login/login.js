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

    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        this.state.userName === "" ? this.setState({ userNameRequired: "dispBlock" }) : this.setState({ userNameRequired: "dispNone" });       

        if (this.state.userName === "" || this.state.password === "") { return }

        // hard coding user name and password applicable 

        if (this.state.password === "Pratham@2020" && this.state.userName === "testingupgrad2021" ) {
            sessionStorage.setItem('userName','admin');
            sessionStorage.setItem('access-token', 'set your access token here');
            this.setState({ loggedIn: true });

            // Once login is validated and successful, navigation to Home UI page is performed
            this.goToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }




}

export default login;