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
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

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
    imageList:{
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
                <ImageList className={classes.imageList} rowHeight={'auto'}>
                {this.state.filteredData.map((item, index) => (
                    <ImageListItem key={item.id}>
                        <HomeItem
                        classes={classes}
                        item={item}
                        userInfo={this.state.userInfo}
                        onLikedClicked={this.likeClickHandler}
                        onAddCommentClicked={this.addCommentClickHandler}
                        commentChangeHandler={this.commentChangeHandler}
                        comments={this.state.comments}/>
                    </ImageListItem>
                ))}
                </ImageList>
            </div>
        </div>
        );
    }
}

class HomeItem extends Component{
    constructor(){
      super();
      this.state = {
        isLiked : false,
        comment:'',
        likes: 3
      }
    }


    //Change handler for comments
    commentChangeHandler = (e) => {
        this.setState({
          comment:e.target.value,
        });
        this.props.commentChangeHandler(e);
    }

    
    //Adding comments in comment section
    onAddCommentClicked = (id) => {

    
        if (this.state.comment === "" || typeof this.state.comment === undefined) {
          return;
        }
        this.setState({
          comment:""
        });
        this.props.onAddCommentClicked(id);
    }


    //Like counter and keeping track of current status
    onLikeClicked = (id) => {
    
        //Update like count
        if (!this.state.isLiked) {
          this.setState({
            likes: this.state.likes + 1
          })
        } else {
          this.setState({
            likes: this.state.likes - 1
          })
        }

        //Update like status for style change
        if (this.state.isLiked) {
          this.setState({
            isLiked:false
          });
        }else {
          this.setState({
            isLiked:true
          });
        }
    }

    render(){
        const {classes, item, userInfo, comments} = this.props;
    
        // Calculate time of image and share latest time with image
        let createdTime = new Date(item.timestamp);
        let dd = createdTime.getDate();
        let mm = createdTime.getMonth() + 1;
        let yyyy = createdTime.getFullYear();    
        let ss = createdTime.getSeconds();
        let MM = createdTime.getMinutes();
        let HH = createdTime.getHours();
    
        let time = dd+"/"+mm+"/"+yyyy+" "+HH+":"+MM+":"+ss;

        //get caption of each image from API endpoint
        let captionText =""
        let likeCount = this.state.likes;
        userInfo.forEach(data => {
            if (data.id === item.id) {
                captionText = data.caption;
              }
        });

        if(captionText === '') {
            return(<div className="home-item-main-container"></div>);
        }
        else{
            return(
                <div className="home-item-main-container">
                    <Card className={classes.card}>
                    <CardHeader 
                        avatar={
                            <Avatar alt="User Profile Pic" src="profile.png" className={classes.avatar}/>
                        }
                        title={item.username}
                        subheader={time}
                    />

                    { /* Display media endpoint item.media_url query */ }
                    <CardContent>
                        <CardMedia
                            className={classes.media}
                            image={item.media_url}
                            title=""
                        />
                        <div className={classes.hr}>
                        <Typography component="p">

                            { /*  Fetching image caption as per logic function */ }
                            {captionText}
                        </Typography>
                        <Typography style={{color:'#4dabf5'}} component="p" >
                            { /*  Hard coding of the hashtags */ }
                            #Nature #Earth #Peace
                        </Typography>
                        </div>
                    </CardContent>

                    <CardActions>
                        <IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this,item.id)}>
                            {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}}/>}
                            {!this.state.isLiked && <FavoriteIconBorder/>}
                        </IconButton>
                    
                        <Typography component="p">
                            {/*Display likes using like logic function in each post*/}
                            {likeCount} likes
                        </Typography>  
                    </CardActions>

                    <CardContent>
                        {comments.hasOwnProperty(item.id) && comments[item.id].map((comment, index)=>{
                        return(
                            <div key={index} className="row">
                                <Typography component="p" style={{fontWeight:'bold'}}>
                                {sessionStorage.getItem('username')}:
                                </Typography>
                                <Typography component="p" >
                                {comment}
                                </Typography>
                            </div>
                        )
                    })}

                        <div className={classes.formControl}>
                            <FormControl style={{flexGrow:1}}>
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler}/>
                            </FormControl>
                            <FormControl class="commentAdd">
                                <Button onClick={this.onAddCommentClicked.bind(this,item.id)}
                                        variant="contained" color="primary">
                                ADD
                                </Button>
                            </FormControl>
                        </div>
                    </CardContent>

                    </Card>
                </div>       
            );
        }
    }

}



  export default withStyles(styles)(Home);