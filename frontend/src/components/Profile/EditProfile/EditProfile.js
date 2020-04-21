import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./EditProfile.css";
import { updateProfileAction } from "../../../store/action/profileAction";


const EditProfile = props => {
    const [data, setData] = useState({});

    useEffect(() => {
        const initialState = {
            first_name: '',
            last_name: '',
            city: '',
            country: '',
            about: '',
            image: null
        };
        setData(initialState);
    }, []);

    const handleChange = e => {
        const name = e.target.name;
        const val = e.target.value;
        setData({ ...data, [name]: val });
    };


    const handlePicture = e => {
        const file = e.target.files[0]
        setData({ ...data, image: file })
    }

   const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (data[key]) {
                formData.append(key, data[key])
            } else {
                formData.append(key, props.userProfile[key])
            }
        });
        await props.dispatch(updateProfileAction(formData))
        props.setEditProfile(!props.editProfile)
   };

    const handleKeepProfile = e => {
        e.preventDefault()
        props.setEditProfile(!props.editProfile) 
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal_edit_content'>
                    <form className='update_form' onSubmit={handleSubmit}>
                        <div className="input_edit_profile">
                            <label className='update_label'>First Name</label>
                            <input className='update_data' name="first_name" type='text' onChange={handleChange}
                            defaultValue={props.userProfile.first_name}/>

                            <label className='update_label'>Last Name</label>
                            <input className='update_data' name="last_name" type='text' onChange={handleChange}
                            defaultValue={props.userProfile.last_name}/>
                        </div>
                       
                        <div className="input_edit_profile">
                            <label className='update_label'>City</label>
                            <input className='update_data' name="city" type='text' onChange={handleChange}
                            defaultValue={props.userProfile.city}/>

                            <label className='update_label'>Country</label>
                            <input className='update_data' name="country" type='text' onChange={handleChange}
                            defaultValue={props.userProfile.country}/>
                        </div>
                        
                        <div className="input_edit_profile">
                            <label className='update_label'>About</label>
                            <input className='update_data' id="about_edit" name="about" type='text' onChange={handleChange}
                            defaultValue={props.userProfile.about}/>
                        </div>

                        <div className="input_edit_profile">
                            <label className='update_label'>Profile picture</label>
                            <input className='update_data' name="image" type='file' onChange={handlePicture} />
                        </div>

                        <div className="edit_buttons">
                            <button type="submit" id="edit_post" className="edit_post_button">Update</button>
                            <button onClick={handleKeepProfile} className="edit_post_button">Cancel</button>
                        </div>
                    </form>
            </div>
        </div>

    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.profileReducer.userProfile,
    };
};

export default connect(mapStateToProps)(EditProfile);