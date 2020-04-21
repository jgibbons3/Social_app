import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./FindFriends.css";
import { allUsersAction } from "../../store/action/profileAction";
import UserCard from "../UserCard/UserCard";
import "./FindFriends.css";
import { followingByUserAction } from "../../store/action/profileAction";


const FindFriends = props => {
    const { dispatch } = props;

    useEffect(() => {
        dispatch(allUsersAction())
        dispatch(followingByUserAction())
    }, [dispatch]);

    return(
        <div className="user_find_friends">
            {props.allUsers && props.allUsers.filter(user => 
                user.id !== props.userProfile.id).map((user, i) => {
                    return <UserCard key={i} user={user}/>
                }    
            )}
        </div>
    );
};


const mapStateToProps = state => {
    return{
        allUsers: state.profileReducer.allUsers,
        userProfile: state.profileReducer.userProfile,
    };
};

export default connect(mapStateToProps)(FindFriends);
