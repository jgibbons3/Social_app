import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postsFollowAction } from "../../../store/action/postAction";
import PostCard from "../../PostCard/PostCard";

const FollowPosts = props => {
    const { dispatch } = props;

    useEffect(() => {
        dispatch(postsFollowAction())
    }, [dispatch]);

    let filteredPost = props.followPosts.filter((post) => post.content.indexOf(props.filter) !== -1);

    return(
        <div className="display_post_container">
            {filteredPost && filteredPost.length === 0 ? <p className="empty_liked_posts_mesage">Follow a user to see her/his posts</p> : 
            filteredPost && filteredPost.map((post, i) => {
                return <PostCard key={i} post={post}/>
            })}
        </div>
    );
};

const mapStateToProps = state => {
    return{
        followPosts: state.postReducer.followPosts
    };
};

export default connect(mapStateToProps)(FollowPosts);


