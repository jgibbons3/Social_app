import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCard from "../../UserCard/UserCard";


const UserFriends = props => {

    useEffect(() => {

    }, [props.userFriends])

    return(
        <div className="user_find_friends">
        {props.userFriends && props.userFriends.map((user, i) => {
            return <UserCard key={i} user={user}/>
        })}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        userFriends: state.userReducer.userFriends,
    }
}

export default connect(mapStateToProps)(UserFriends);