import React from "react";
import { connect } from "react-redux";
import UserCard from "../../UserCard/UserCard";


const UserFollowing = props => {

    return(
        <div className="user_find_friends">
            {props.userFollowing && props.userFollowing.map((user, i) => {
            return <UserCard key={i} user={user}/>
        })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userFollowing: state.userReducer.userFollowing
    };
};

export default connect(mapStateToProps)(UserFollowing);