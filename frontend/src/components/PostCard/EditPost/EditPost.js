import React, { useState } from "react";
import { connect } from "react-redux";
import "./EditPost.css";
import { updatePostAction } from "../../../store/action/postAction";


const EditPost = props => {
    const [data, setData] = useState();

    const handleChange = e => {
        e.preventDefault()
        const val = e.target.value;
        setData(val);
    }

   const handleSubmit = e => {
        e.preventDefault()
        props.dispatch(updatePostAction(props.post, data))
        props.setEditPost(!props.editPost)
        props.setDisplayMenu(!props.displayMenu)
   }

    const handleKeepPost = e => {
        e.preventDefault()
        props.setEditPost(!props.editPost) 
        props.setDisplayMenu(!props.displayMenu)
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal_edit_content'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <textarea className='update-input' name="content" type='text'
                            defaultValue={props.post.content} onChange={handleChange}/>
                        </div>

                        <div className="edit_buttons">
                            <button type="submit" id="edit_post" className="edit_post_button">Update</button>
                            <button onClick={handleKeepPost} className="edit_post_button">Cancel</button>
                        </div>
                    </form>
            </div>
        </div>

    );
};


export default connect()(EditPost);