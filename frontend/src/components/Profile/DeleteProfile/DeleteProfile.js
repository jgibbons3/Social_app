import React from "react";
import { connect } from "react-redux";


const DeleteProfile = props => {

   const handleDeleteProfile = e => {
        e.preventDefault()
        // props.dispatch(deleteProfileAction()) hay que hacer el endpoint
        props.setDeleteProfile(!props.deleteProfile)
   }

    const handleKeepProfile = e => {
        e.preventDefault()
        props.setDeleteProfile(!props.deleteProfile) 
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal-content'>
                    <div className="delete_post_message">
                        <p>Are you sure you want to delete your account?</p>
                    </div>

                    <div>
                        <button onClick={handleDeleteProfile} className="delete_post_button">Yes</button>
                        <button onClick={handleKeepProfile} className="delete_post_button">No</button>
                    </div>
            </div>
        </div>

    );
};


export default connect()(DeleteProfile);