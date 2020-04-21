import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postsLikedAction } from "../../../store/action/postAction";
import PostCard from "../../PostCard/PostCard";


const LikedPosts = props => {
    const { dispatch, userProfile, allPosts } = props;

    useEffect(() => {    
        dispatch(postsLikedAction()) 
    }, [dispatch, userProfile, allPosts]);

    let filteredPost = props.likedPosts.filter((post) => post.content.indexOf(props.filter) !== -1);

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
        likedPosts: state.postReducer.likedPosts,
        userProfile: state.profileReducer.userProfile,
        allPosts: state.postReducer.allPosts
    };
};

export default connect(mapStateToProps)(LikedPosts);

