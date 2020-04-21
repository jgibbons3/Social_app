import React from "react";
import { connect } from "react-redux";
import UserCard from "../../UserCard/UserCard";


const UserFollowers = props => {

    return(
        <div className="user_find_friends">
            {props.userFollowers && props.userFollowers.map((user, i) => {
            return <UserCard key={i} user={user}/>
        })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userFollowers: state.userReducer.userFollowers
    };
};

export default connect(mapStateToProps)(UserFollowers);