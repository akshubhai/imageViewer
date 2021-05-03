import React, {Component} from 'react';
import './Header.css';

import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';


const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#c0c0c0',
    marginLeft: 0,
    width: '310px',
  },
  searchIcon: {
    width: theme.spacing.unit * 1,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#000000'
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit*3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 500,
      '&:focus': {
        width: 210
      }
    },
    align: 'right',
    float : 'right'
  },
  avatar: {
    width: 60,
    height: 60,
  },
  appHeader:{
    backgroundColor:'#263238'
  },
  hr:{
    height:'1.8px',
    backgroundColor:'#f2f2f2',
    marginLeft:'6px',
    marginRight:'6px'
  }
})

class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      profile_picture : 'profile.png'
    };
  }

  handleClick = (event) =>{
    this.setState({
      anchorEl: event.currentTarget
    })
  }


  // Navigation to Profile page by clicking on My Account dropdown
  handleAccount = ()=>{
    this.props.handleAccount();
    this.handleClose();
  }

  // In case of logout operation
  handleLogout = ()=>{
    this.props.handleLogout();
    this.handleClose();
  }

  //Set handle to null
  handleClose = () =>{
    this.setState({ anchorEl: null });
  }

  render(){
    const {classes,screen} = this.props;
    return (<div>
        <AppBar className={classes.appHeader}>
          <Toolbar>
            { /*   display logo image viewer on all 3 pages*/ }

            {(screen === "Login" || screen === "Home") && <span className="header-logo">Image Viewer</span>}
            {(screen === "Profile") && <Link style={{ textDecoration: 'none', color: 'white' }} to="/home"><span className="header-logo">Image Viewer</span></Link>}
            <div className={classes.grow}/>

            { /*   If UI page is home then display search bar */ }
            {(screen === "Home") &&
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase onChange={(e)=>{this.props.searchHandler(e.target.value)}} placeholder="     Search…" classes={{
                    input: classes.inputInput
                  }}/>
              </div>
            }

            { /*   If the UI page is Home or Profile page, then display Profile icon */ }
            {(screen === "Home" || screen === "Profile")  &&
              <div>
                <IconButton onClick={this.handleClick}>
                  <Avatar alt="Profile Pic" src={this.state.profile_picture} className={classes.avatar} style={{border: "2px solid #fff"}}/>
                </IconButton>
                <Popover
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                    <div style={{padding:'6px'}}>

                      { /*   On Home page, then drop down on the profile icon should have 2 either My Account or Logout */ }
                      { (screen === "Home") &&
                        <div>
                          <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                          <div className={classes.hr}/>
                        </div>
                      }
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </div>
                </Popover>
              </div>
            }
          </Toolbar>
        </AppBar>
    </div>)
  }
  
}

export default withStyles(styles)(Header)
