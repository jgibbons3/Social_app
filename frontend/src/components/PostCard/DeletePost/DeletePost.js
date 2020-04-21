import React from "react";
import { connect } from "react-redux";
import "./DeletePost.css";
import { deletePostAction } from "../../../store/action/postAction";


const DeletePost = props => {

   const handleDeletePost = e => {
        e.preventDefault()
        props.dispatch(deletePostAction(props.postId))
        props.setDeletePost(!props.deletePost)
        props.setDisplayMenu(!props.displayMenu)
   }

    const handleKeepPost = e => {
        e.preventDefault()
        props.setDeletePost(!props.deletePost) 
        props.setDisplayMenu(!props.displayMenu)
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal-content'>
                    <div className="delete_post_message">
                        <p>Are you sure you want to delete this post?</p>
                    </div>

                    <div>
                        <button onClick={handleDeletePost} className="delete_post_button">Yes</button>
                        <button onClick={handleKeepPost} className="delete_post_button">No</button>
                    </div>
            </div>
        </div>

    );
};


export default connect()(DeletePost);