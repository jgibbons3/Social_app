import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostCard from "../../PostCard/PostCard";
import { userFriendsAction, userFollowingAction, userPostsAction, userFollowersAction } from "../../../store/action/userAction";


const UserPosts = props => {

    useEffect(() => {
        props.dispatch(userPostsAction(props.userProfile))
        props.dispatch(userFriendsAction(props.userProfile))
        props.dispatch(userFollowingAction())
        props.dispatch(userFollowersAction())
    }, []);

    return(
        <div className="display_post_container">
        {props.userPosts && props.userPosts.map((post, i) => {
            return <PostCard key={i} post={post}/>
        })}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        userProfile: state.profileReducer.userProfile,
        userPosts: state.userReducer.userPosts
    }
}

export default connect(mapStateToProps)(UserPosts);