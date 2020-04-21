import React from "react";
import { connect } from "react-redux";
import "./AllComments.css";


const AllComments = props => {
  
    return(
        <div>
            <div className="user_info_card_1" key={props.key}>
                <div>
                    <img className="card_profile_pic" src={props.comment.comment_owner.image} alt="user_comment_image"/>
                </div>
                <div className="username_post_card">
                    <p>{props.comment.comment_owner.username}</p>
                    <p className="post_card_date">{props.comment.date}</p>
                </div>
                
            </div>  
            <div className="post_comment">
                <p>{props.comment.comment}</p>
            </div>   
        </div>   
    );
};


export default connect()(AllComments);
