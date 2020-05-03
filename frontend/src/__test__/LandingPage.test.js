import React from "react";
import ReactDOM from "react-dom";
import { LandingPage } from "../components/LandingPage/LandingPage";
import ReactTestUtils from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

 
const middlewares = [thunk]
const mockStore = configureStore(middlewares);


it('notification icon display modal window', () => {
    const div = document.createElement("div");

    const store = mockStore({
        profileReducer: {},
        userReducer: {},
        postReducer: {}
    });


    ReactDOM.render(
        <MemoryRouter>
            <Provider store={store}>
                <LandingPage authenticated={true} location={({pathname: ''})} userProfile={({})} 
                    userPosts={[]} userFriends={[]} userFollowers={[]} userFollowing={[]}
                    dispatch={() => {}}  />
            </Provider>
        </MemoryRouter>
    ,div)
    
    // get button that will render the modal window
    const notifaction_icon = div.querySelector('#notification_wrapper')
    
    // // simulate the click function that will display the modal window
    ReactTestUtils.Simulate.click(notifaction_icon)

    // // get modal window by its id, which is only visitble after click function
    const modal_notification = div.querySelector('#notif_modal')
    // // expect the modal to be true by its id tag
    expect(modal_notification.id).toBe("notif_modal")
  });

