import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostCard from "../../PostCard/PostCard";
import { userFriendsAction, userFollowingAction, userPostsAction, userFollowersAction } from "../../../store/action/userAction";


const UserPosts = props => {
    const { dispatch, userProfile } = props;

    useEffect(() => {
        dispatch(userPostsAction(userProfile))
        dispatch(userFriendsAction(userProfile))
        dispatch(userFollowingAction())
        dispatch(userFollowersAction())
    }, [dispatch, userProfile]);

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