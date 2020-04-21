import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./UserCard.css";
import { followUserAction } from "../../store/action/profileAction";
import { addFriendAction } from "../../store/action/profileAction";


const UserCard = props => {

    const handleFollow = () => {
        props.dispatch(followUserAction(props.user))
    }

    const handleAddFriend = () => {
        props.dispatch(addFriendAction(props.user))
    }

    //Like/dislike
    const listFolloingByUser = [];
    props.followingByUser.map(item => {
        return listFolloingByUser.push(item.id)
    })

    const color = listFolloingByUser.includes(props.user.id) ?  'rgb(161, 134, 98)' : 'white'
    const follow_unfollow = listFolloingByUser.includes(props.user.id) ?  "UNFOLLOW" : "FOLLOW"

    //Friends / no friends
    const listUserFriends = [];
    props.userFriends.map(item => {
        return listUserFriends.push(item.id)
    })

    const color_friend = listUserFriends.includes(props.user.id) ? 'rgb(161, 134, 98)' : 'white' 
    const friends = listUserFriends.includes(props.user.id) ?  "FRIENDS" : "ADD FRIEND"

    useEffect(() => {

    }, [props.followingByUser]);


    return(
        <div className="UserCardWrapper" key={props.i}>
            <div>
                <img className="card_profile_pic" src={props.user.image} alt="profile_pic"/>
            </div>
            <div className="user_card_name">
                <p className="user_card_name1">{props.user.first_name}</p> &ensp;
                <p className="user_card_name1">{props.user.last_name}</p>
            </div>
            <div className="user_card_location">
                <p className="user_card_name2">{props.user.city},</p> &ensp;
                <p className="user_card_name2">{props.user.country}</p>
            </div>
            <div className="user_card_buttons_options">
                <button style={{background: color, cursor: "pointer"}} onClick={handleFollow} className="user_card_buttons">{follow_unfollow}</button>
                 <button style={{background: color_friend, cursor: "pointer"}} onClick={handleAddFriend} className="user_card_buttons">{friends}</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return{
        followingByUser: state.profileReducer.followingByUser,
        userFriends: state.userReducer.userFriends
    };
};

export default connect(mapStateToProps)(UserCard);