import React from "react";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import "./LikeButton.css";
import { likePostAction } from "../../store/action/postAction";


const LikeButton = props => {

    const handleLike = e => {
        e.preventDefault()
        props.dispatch(likePostAction(props.post.id))
    }
    const color = props.userProfile && props.userProfile.like_post.includes(props.post.id) ?  'rgb(161, 134, 98)' : 'lightgray'
 
    return(
        <>
            <button onClick={handleLike}  className="like_post_button"> <FaHeart size={20} style={{cursor: 'pointer', color: color}}/></button>
            <p> Like </p>
        </>
    );
};

const mapStateToProps = state => {
    return {
        allPosts: state.postReducer.allPosts,
        userProfile: state.profileReducer.userProfile
    };
};

export default connect(mapStateToProps)(LikeButton);

