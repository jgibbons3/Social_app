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


it("display notif when click on icon", () => {
    const div = document.createElement("div");

    const store = mockStore({
        profileReducer: {},
        userReducer: {},
        postReducer: {}
    });


    // ReactDOM.render(
    //     <MemoryRouter>
    //         <Provider store={store}>
    //             <LandingPage authenticated={true} location={({pathname: ''})} userProfile={({})} 
    //                 userPosts={[]} userFriends={[]} userFollowers={[]} userFollowing={[]}
    //                 dispatch={() => {}}  />
    //         </Provider>
    //     </MemoryRouter>
    // ,div)

    //     console.log("hola", div)
    
// it(, () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<LandingPage />, div)

//     // const notificationIcon = div.querySelector('#notification_wrapper')
//     // console.log("notif", notificationIcon)
//     // expect(message.textContent).toEqual('No pending requests')
// })
});

