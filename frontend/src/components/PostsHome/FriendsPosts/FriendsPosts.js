import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postsFriendsAction } from "../../../store/action/postAction";
import PostCard from "../../PostCard/PostCard";


const FriendsPosts = props => {
    const { dispatch } = props;

    useEffect(() => {
        dispatch(postsFriendsAction())
    }, [dispatch]);

    let filteredPost = props.friendsPosts.filter((post) => post.content.indexOf(props.filter) !== -1);

    return(
        <div className="display_post_container">
            {filteredPost && filteredPost.map((post, i) => {
                return <PostCard key={i} post={post}/>
            })}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        friendsPosts: state.postReducer.friendsPosts
    };
};

export default connect(mapStateToProps)(FriendsPosts);