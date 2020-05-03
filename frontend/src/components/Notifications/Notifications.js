import React from "react";
import { connect } from "react-redux";
import "./Notifications.css";
import { FiClock } from "react-icons/fi";
import { MdCancel, MdDone } from "react-icons/md";
import { rejectFriendRequestAction, aceptFriendRequestAction } from "../../store/action/userAction";


export const Notifications = props => {

    const handleAcceptRequest = (e, receivedRequest) => {
        e.preventDefault()
        props.dispatch(aceptFriendRequestAction(receivedRequest))
    }

    const handleRejectRequest = (e, receivedRequest) => {
        e.preventDefault()
        props.dispatch(rejectFriendRequestAction(receivedRequest))
    }    
    

    return (
        <div className="notif_container">
            <p className="requests_titles">Received requests</p>

            {props.pendingFriends && props.pendingFriends.length === 0 ? <p id="friend_pending_request" className="friend_pending_request">
                No pending requests</p> : <></>}

            {props.pendingFriends && props.pendingFriends.map((receivedRequest, i) => {
                return <div id="pendingFriends_request" className="resquest_card" key={i}> 
                    <img className="friend_image" src={receivedRequest.image} alt="user_profile_picture" />
                    <div className="request_user_information">
                        <p className="request_user_name">{receivedRequest.first_name} {receivedRequest.last_name}</p>
                        <p className="request_user_location">{receivedRequest.city} {receivedRequest.country}</p>
                    </div>
                    <div className="request_icon">
                        <div className="accept_icon" onClick={(e) => handleAcceptRequest(e, receivedRequest)}>
                            <MdDone size={20} style={{color: 'white', cursor: 'pointer'}}/>
                        </div>
                        <div className="cancel_icon" onClick={(e) => handleRejectRequest(e, receivedRequest)}>
                            <MdCancel size={28} style={{color: 'gray', cursor: 'pointer'}}/>
                        </div>
                    </div>
                </div>
            })}

            <p className="requests_titles">Sent requests</p>

            {!props.pendingRequests ? <p id="sent_pending_request" className="friend_pending_request">
                No pending requests</p> : <></>}

            {props.pendingRequests && props.pendingRequests.map((sentRequest, i) => {
                return <div className="resquest_card" key={i}> 
                    <img className="friend_image" src={sentRequest.image} alt="user_picture" />
                    <div className="request_user_information">
                        <p className="request_user_name">{sentRequest.first_name} {sentRequest.last_name}</p>
                        <p className="request_user_location">{sentRequest.city} {sentRequest.country}</p> 
                    </div> 
                    <div className="request_icon">
                        <FiClock size={28} style={{color: 'gray'}}/>
                    </div>
                </div>
            })}
        </div>
    );
};

const mapStatetoProps = state => {
    return{
        pendingFriends: state.userReducer.pendingFriends,
        pendingRequests: state.userReducer.pendingRequests
    };
};

export default connect(mapStatetoProps)(Notifications);