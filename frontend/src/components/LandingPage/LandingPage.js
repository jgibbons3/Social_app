import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./LandingPage.css";
import { Link, Route, Redirect } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from 'react-icons/io';
import { FaUserFriends } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import FindFriends from "../FindFriends/FindFriends";
import PostsHome from "../PostsHome/PostsHome";
import Profile from "../Profile/Profile";
import Notifications from "../Notifications/Notifications";
import { pendingFriendRequestAction } from "../../store/action/userAction";


const LandingPage = props => {
    const [notif, setNotif] = useState(false)
    const counter = props.pendingRequests.length + props.pendingFriends.length
    const PathName = props.location.pathname;

    const color_notifi = counter >= 1 ? 'rgb(161, 134, 98)' : "black";
    
    const handleNotifications = e => {
        e.preventDefault()
        setNotif(!notif)
    }
     
    const { dispatch, userProfile } = props;
    useEffect(() => {
        if(userProfile instanceof Array === false) {
            dispatch(pendingFriendRequestAction(userProfile))
        }
    }, [userProfile, dispatch]);
   

    return(
        <div className='LandingPageWrapper'>

            {/* // top menu bar */}
            <div className='MenuWrapper'>
                <div className='leftMenu'>

                    <Link to="/posts/all_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/posts') ? 'user_menu_clicked' : 'leftMenuOptions'}>
                        <MdComment/> Posts</p>
                    </Link>
                   
                    <Link to="/findfriends" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/findfriends') ? 'user_menu_clicked' : 'leftMenuOptions'}> 
                        <FaUserFriends/> Find Friends</p>
                    </Link>
               
                </div>

                <div className='rightMenu'>

                    <div onClick={handleNotifications} style={{cursor: 'pointer'}} >
                        <p style={{color: color_notifi}} className='rightMenuOptions'> <IoIosNotificationsOutline size={20}/> 
                        {counter}</p>
                    </div>

                    <Link to="/profile" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/profile') ? 'user_menu_clicked' : 'leftMenuOptions'}> 
                        <FiUser/> Profile</p>
                    </Link>

                    <div>
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <p className='rightMenuOptions'> <IoMdLogOut/> Logout</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <Body componenets/> */}
            <div className='MainLPWrapper'>
                {notif ?  <Notifications/> : <></> }

                <Route path='/findfriends' component={FindFriends}/>
                <Route path='/posts' component={PostsHome}/>
                <Route path='/profile' component={Profile}/>
                <Redirect from="/" to="/posts"/>  
            </div>
        </div>
    );
};

const mapStatetoProps = state => {
    return{
        userProfile: state.profileReducer.userProfile,
        pendingFriends: state.userReducer.pendingFriends,
        pendingRequests: state.userReducer.pendingRequests
    }
}

export default connect(mapStatetoProps)(LandingPage)