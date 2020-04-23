import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./PostCard.css";
import { AiOutlineMenu } from "react-icons/ai";
import LikeButton from "../LikeButton/LikeButton";
import CommentCard from "../CommentCard/CommentCard";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeletePost from "./DeletePost/DeletePost";
import EditPost from "./EditPost/EditPost";
import { postCommentAction } from "../../store/action/commentAction";
import AllComments from "../CommentCard/AllComments/AllComments";


const PostCard = props => {
    let [stateComment, setComments] = useState()

    const [displayMenu, setDisplayMenu] = useState(false)
    const [deletePost, setDeletePost] = useState(false)
    const [editPost, setEditPost] = useState(false)

    const handleMenuPost = e => {
        e.preventDefault()
        setDisplayMenu(!displayMenu)
    };

    const handleEdit = e => {
        e.preventDefault()
        setEditPost(!editPost)
    };

    const handleDelete = e => {
        e.preventDefault()
        setDeletePost(!deletePost)
    };
 
    const { dispatch, post, newComment } = props
    useEffect(() => {
        async function fetchData() {
            const response = await dispatch(postCommentAction(post))
            if (response) {
                setComments(response);
            } 
        };
        fetchData();
    }, [dispatch, post, newComment])


    return(   
        <div className="PostCardWrapper" key={props.i}> 

            {deletePost ? <DeletePost displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} setDeletePost={setDeletePost} 
            deletePost={deletePost} postId={props.post.id}/> : <></>}

            {editPost ? <EditPost displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} setEditPost={setEditPost} 
            editPost={editPost} post={props.post}/> : <></>}

            <div className="user_info_card">
                <div className="user_info_card_1">
                    <div className="user_image_container">
                        <img className="card_profile_pic" src={props.post.owner.image} alt="profile_pic"/>
                    </div>
                    <div className="username_post_card">
                        <p>{props.post.owner.username}</p>
                        <p className="post_card_date">{props.post.date}</p>
                    </div>
                </div>
                <div>
                    {props.post.owner.id === props.userProfile.id ? 
                    <div className="menu_post_card_icon" onClick={handleMenuPost}>
                        <AiOutlineMenu size={30} style={{color: 'gray', cursor: 'pointer'}}/>
                    </div> : <> </>}
                </div>
            </div> 

            <div>
                {displayMenu ? <div className="menu_post_options"> 
                <div className="icons_menu" style={{cursor: 'pointer'}}  onClick={handleEdit}>
                    <MdEdit size={20} style={{color: 'gray'}}/> <p className="edit_post">Edit</p> 
                </div>
                <div className="icons_menu" style={{cursor: 'pointer'}} onClick={handleDelete}>
                    <MdDelete size={20} style={{color: 'gray'}}/> <p className="edit_post">Delete</p>
                </div>
                </div> : <> </>}

                <p className="user_card_content">{props.post.content} </p>
            </div>

            <div>
                {props.post.image ?
                <img className="post_card_image" src={props.post.image} alt="post_image"/> : <> </>}
            </div>

            <div className="comment_box">
                {stateComment && stateComment.map((comment, i) => {
                    return <AllComments key={i} comment={comment}/> 
                })}
                <CommentCard postId={props.post.id}/>
            </div>

            <div className="icons_post_card">
                <div className="sub_icons_post_card_1">
                    <LikeButton post={props.post} />
                </div>
                <div>
                    <p> {props.post.total_likes} likes</p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.profileReducer.userProfile,
        allPosts: state.postReducer.allPosts,
        newComment: state.commentReducer.comment
    }
}

export default connect(mapStateToProps)(PostCard);