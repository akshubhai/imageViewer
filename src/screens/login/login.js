import React, { Component } from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import Header from '../../common/header/Header';
import './Login.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
    card: {
        padding: '16px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '350px',
        transform: 'translateX(-60%)',
    },
    title: {
        fontSize: 24
    }
};

const useStyles = makeStyles((theme) => ({
    
  }));


class Login extends Component{
    
    //Write the constructor to define initial state of login object
    constructor(){
        super();
        this.state = {
            username : "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            incorrectUsernamePassword: "dispNone",
            logInStatus : sessionStorage.getItem('access-token') == null ? false:true,
            passfieldActivate: true

        }

    }

    //redirect to home page
    goToHome = () =>{
        this.props.history.push('/home');
    }

    //Input password change handler
    passwordChangeHandler = (e) =>{
        this.setState({password: e.target.value});
        this.activateField(e);
        e.preventDefault();
    }

    //Input userName change handler
    usernameChangeHandler = (e) =>{
        this.setState({username: e.target.value});
    }

    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });       

        if (this.state.username === "" || this.state.password === "") { return }

        // hard coding user name and password applicable 

        if (this.state.password === "Pratham@2020" && this.state.username === "testingupgrad2021" ) {
            sessionStorage.setItem('username','admin');
            sessionStorage.setItem('access-token', 'set your access token here');
            this.setState({ logInStatus: true });

            // Once login is validated and successful, navigation to Home UI page is performed
            this.goToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }

    
    render(){
        const{classes} = this.props;
        return(
            <div className="master-container">
                <Header screen ={"Login"}/>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />

                        <FormControl required style={{width: '100%'}}/>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                       <br /><br />
                        <FormControl required style={{width: '100%'}}/>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                       <br /><br />



                    <div className={this.state.incorrectUsernamePassword}><span className="red"> Incorrect username and/or password </span></div><br />
                    <Button color="primary" variant="contained" onClick={this.loginClickHandler} >LOGIN</Button>
                    </CardContent>
                    
                </Card>
            </div>
        )
    }


}

export default Login;