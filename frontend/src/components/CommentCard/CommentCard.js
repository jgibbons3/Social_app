import React, { useState } from "react";
import { connect } from "react-redux";
import "./CommentCard.css";
import { IoMdCreate } from 'react-icons/io';
import { newCommentAction } from "../../store/action/commentAction";


const CommentCard = props => {
    let [state, setState] = useState({
        comment: '',
    });

    const handleComment = e => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const handleCommentSubmit = e => {
        e.preventDefault()
        props.dispatch(newCommentAction(state.comment, props.postId))
        state.comment =  ""
    };


    return(
        <div>
            <form onSubmit={handleCommentSubmit}> 
                <input className='comment_input' type='text' name='comment' placeholder='add a comment' 
                onChange={handleComment} value={state.comment}>
                </input>
                <button className="comment_submit_button" type="submit">
                    <IoMdCreate style={{cursor: "pointer"}} size={25}/>
                </button>
            </form>
        </div>
    );
};


export default connect()(CommentCard);