import React, { useState } from "react";
import { connect } from "react-redux";
import "./Profile.css";
import { Link, Route, Redirect } from "react-router-dom";
import UserPosts from "./UserPosts/UserPosts";
import UserFriends from "./UserFriends/UserFriends";
import UserFollowers from "./UserFollowers/UserFollowers";
import UserFollowing from "./UserFollowing/UserFollowing";
import DeleteProfile from "./DeleteProfile/DeleteProfile";
import EditProfile from "./EditProfile/EditProfile";


const Profile = props => {
    const [deleteProfile, setDeleteProfile] = useState(false)
    const [editProfile, setEditProfile] = useState(false)

    const handleDelete = e => {
        e.preventDefault()
        setDeleteProfile(!deleteProfile)
    }
   
    const handleEdit = e => {
        e.preventDefault()
        setEditProfile(!editProfile)
    }

    const PathName = props.location.pathname;

    return(
        <>
        <div className="user_profile_and_links">
            {deleteProfile ? <DeleteProfile deleteProfile={deleteProfile} setDeleteProfile={setDeleteProfile}/> : <></>}
            {editProfile ? <EditProfile editProfile={editProfile} setEditProfile={setEditProfile}/> : <></>}

            {/* user card info */}
            <div className="user_profile_info" >
                <div>
                    <img className="card_profile_pic2" src={`http://localhost:8000${props.userProfile.image}`} alt="profile_pic"/>
                </div>  
                <div className="user_card_name">
                    <p className="user_card_name1">{props.userProfile.first_name}</p> &ensp;
                    <p className="user_card_name1">{props.userProfile.last_name}</p>
                </div>
                <div className="user_card_location">
                    <p className="user_card_name2">{props.userProfile.city},</p> &ensp;
                    <p className="user_card_name2">{props.userProfile.country}</p>
                </div>  
                <div className="user_profile_buttons_options">
                    <button style={{cursor: "pointer"}} onClick={handleEdit} id="user_profile_buttons">EDIT PROFILE</button>
                    <button style={{cursor: "pointer"}} onClick={handleDelete} id="user_profile_buttons">DELETE PROFILE</button>
                </div>
            </div>
           

            {/* about user plus links */}
            <div className="profile_descriptoion_links">
               
                
                   <div className="profile_description">
                        <p>About</p>
                        <p>{props.userProfile.about}</p>
                    </div>
               
                                  
                <div className="profile_links">
                 
                    <Link to="/profile/user_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/user_posts') ? 'user_option_clicked' : 'subMenuOptions'}>
                            {props.userPosts.length} Posts</p>
                        
                    </Link>

                    <Link to="/profile/friends" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/friends') ? 'user_option_clicked' : 'subMenuOptions'}>
                            {props.userFriends.length} Friends</p>
                    </Link>

                    <Link to="/profile/followers" style={{textDecoration: 'none'}}> 
                        <p className={PathName.includes('/followers') ? 'user_option_clicked' : 'subMenuOptions'}>
                            {props.userFollowers.length} Followers</p>
                    </Link>

                    <Link to="/profile/following" style={{textDecoration: 'none'}}> 
                        <p className={PathName.includes('/following') ? 'user_option_clicked' : 'subMenuOptions'}>
                            {props.userFollowing.length} Following</p>
                    </Link>

                </div>
            </div>
           
        </div>
        <div>
            <Route path='/profile/user_posts' component={UserPosts}/>
            <Route exact path='/profile/friends' component={UserFriends}/>
            <Route exact path='/profile/followers' component={UserFollowers}/>
            <Route exact path='/profile/following' component={UserFollowing}/>
            <Redirect from="/profile" to="/profile/user_posts"/>
        </div>
        </>
    );
};


const mapStateToProps = state => {
    return {
        userProfile: state.profileReducer.userProfile,
        userPosts: state.userReducer.userPosts,
        userFriends: state.userReducer.userFriends,
        userFollowing: state.userReducer.userFollowing,
        userFollowers: state.userReducer.userFollowers
    };
};

export default connect(mapStateToProps)(Profile);