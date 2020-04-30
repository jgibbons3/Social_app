import React from "react";
import ReactDOM from "react-dom";
import { Profile } from "../components/Profile/Profile";
import ReactTestUtils from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureStore(middlewares);


it('renders edit modal window if button is clicked', () => {
    const div = document.createElement("div");

    const store = mockStore({
        profileReducer: {},
        userReducer: {},
    });


    ReactDOM.render(
        <MemoryRouter>
            <Provider store={store}>
                <Profile authenticated={true} location={({pathname: ''})} userProfile={({})} 
                    userPosts={[]} userFriends={[]} userFollowers={[]} userFollowing={[]}
                    dispatch={() => {}}  />
            </Provider>
        </MemoryRouter>
    ,div)
    
    // get button that will render the modal window
    const delete_user_profile = div.querySelector('#test_delete_profile')
    // simulate the click function that will display the modal window
    ReactTestUtils.Simulate.click(delete_user_profile)
    // get modal window by its id 
    const modal_delete_profile = div.querySelector('#edit_profile_modal')
    // expect the modal to be true by its id tag
    expect(modal_delete_profile.id).toBe("edit_profile_modal")
  });
  

     