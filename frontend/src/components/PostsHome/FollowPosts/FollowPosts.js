import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postsFollowAction } from "../../../store/action/postAction";
import PostCard from "../../PostCard/PostCard";

const FollowPosts = props => {

    useEffect(() => {
        props.dispatch(postsFollowAction())
    }, [props.dispatch]);

    let filteredPost = props.followPosts.filter((post) => post.content.indexOf(props.filter) !== -1);

    return(
        <div className="display_post_container">
            {filteredPost && filteredPost.map((post, i) => {
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


