import React from "react";
import ReactDOM from "react-dom";
import { Notifications } from "../components/Notifications/Notifications";


it("should render a list with the body of each item inside a div", () => {
    const itemsArray = [{ id: 1, first_name: 'Anna', last_name: 'Test' }, { id: 2, first_name: 'Karla', last_name: 'Test1' },
     { id: 3, first_name: 'Alex', last_name: 'Test2' }]
    
    const div = document.createElement("div");
    ReactDOM.render(<Notifications pendingFriends={itemsArray}/>, div)

   const items = div.querySelector('#pendingFriends_request')

    expect(items.children).toHaveLength(itemsArray.length)
})


it("should render a message if item list is empty ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Notifications pendingFriends={[]}/>, div)

    const message = div.querySelector('#friend_pending_request')
    
    expect(message.textContent).toEqual('No pending requests')
})
