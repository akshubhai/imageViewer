import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {constants} from '../../common/utils'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

const styles =  theme => ({
    card: {
      maxWidth: 1200,
    },
    avatar: {
      margin: 12,
    },
    media: {
      height:0,
      paddingTop: '57.85%', // 16:9
    },
    formControl: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'baseline',
    },
    comment:{
      display:'flex',
      alignItems:'center'
    },
    hr:{
      marginTop:'12px',
      borderTop:'3px solid #f2f2f2'
    },
    gridList:{
      width: 1150,
      height: 'auto',
      overflowY: 'auto',
    },
    grid:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:96
    }
  });

class Home extends Component{

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
          props.history.replace('/');
        }
        this.state = {
          data: [],
          filteredData:[],
          userData:[],
          likeSet:new Set(),
          comments:{},
          currrentComment:"",
          userInfo:[],
          likes: 0
        }
    }

    componentDidMount(){
    this.getBaseUserInfo();
    }


    //Search data entered is set as userinfo data
    onSearchEntered = (value)=>{
        console.log('search value', value);
        let filteredData = this.state.userInfo;

        filteredData = filteredData.filter((data) =>{
            let string = data.caption.toLowerCase();
            let subString = value.toLowerCase();
            return string.includes(subString);
          })

        this.setState({
            userInfo: filteredData
        })
    }


    //COmment click handle to add comments
    addCommentClickHandler = (id)=>{
        //no comment made
        if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
          return;
        }

        //cancat comment list
        let commentList = this.state.comments.hasOwnProperty(id)?
          this.state.comments[id].concat(this.state.currentComment): [].concat(this.state.currentComment);
    
        this.setState({
          comments:{
            ...this.state.comments,
            [id]:commentList
          },
          currentComment:''
        })
    }

    
    //Change value of comment
    commentChangeHandler = (e) => {
        this.setState({
          currentComment:e.target.value
        });
    }

    //Generate media data for seecond uri
    getMediaData = (id) => {
        let that = this;
        let url = `${constants.userMediaUrl}/${id}?fields=id,media_type,media_url,username,timestamp&access_token=&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url,{
          method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
          that.setState({
            filteredData: this.state.filteredData.concat(jsonResponse)
          })
        }).catch((error) => {
          console.log('error user data',error);
        });
    }


    //get uri for first api endpoint
    getBaseUserInfo = () => {
        let that = this;
        let url = `${constants.userInfoUrl}=${sessionStorage.getItem('access-token')}`;
        return fetch(url,{
          method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
          that.setState({
            userInfo:jsonResponse.data
          });
          this.state.userInfo.map((data, index) => (
              this.getMediaData(data.id)
          ));
        }).catch((error) => {
          console.log('error user data',error);
        });
    }


    //Go to profile page
    navigateToAccount = () =>{
        this.props.history.push('/profile');
    }


    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    render(){
    const{classes} = this.props;
    return(
        <div>
        <Header
            userProfileUrl="profile.png"
            screen={"Home"}
            searchHandler={this.onSearchEntered}
            handleLogout={this.logout}
            handleAccount={this.navigateToAccount}/>

            <div className={classes.grid}>
                <GridList className={classes.gridList} cellHeight={'auto'}>
                {this.state.filteredData.map((item, index) => (
                    <GridListTile key={item.id}>
                        <HomeItem
                        classes={classes}
                        item={item}
                        userInfo={this.state.userInfo}
                        onLikedClicked={this.likeClickHandler}
                        onAddCommentClicked={this.addCommentClickHandler}
                        commentChangeHandler={this.commentChangeHandler}
                        comments={this.state.comments}/>
                    </GridListTile>
                ))}
                </GridList>
            </div>
        </div>
        );
    }
}





  export default withStyles(styles)(Home);