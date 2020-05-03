import React from "react";
import ReactDOM from "react-dom";
import { Login } from "../components/Login/Login";
import ReactTestUtils from "react-dom/test-utils";
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';


it("renders button login with correct text content and there is only 1 button tagName", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login/>, div)

    const button = div.querySelector('#login_button')
    const buttonCount = div.getElementsByTagName("button")

    expect(button.textContent).toBe('Login')
    expect(buttonCount).toHaveLength(1)
})


it("handleChange checks is working", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login/>, div)

    const email_input = div.querySelector('#email_input');

    const mockEvent = {
        target: {
            name: "email",
            value: "test@test.com"
        }
    };
    ReactTestUtils.Simulate.change(email_input, mockEvent)
    expect(email_input.value).toEqual(mockEvent.target.value);
})


// mock store to test dispatch action.
const mockStore = configureStore([]);

let store;
let component;
 

store = mockStore({});

store.dispatch = jest.fn();

component = renderer.create(
    <Provider store={store}>
        <Login />
    </Provider>
);

it("handleSubmit dispatch an accion", () => {
    renderer.act(() => {
        const loginForm = component.root.findByType('form');
        ReactTestUtils.Simulate.submit(loginForm)
    });

    setTimeout(() => {
        expect(store.dispatch).toHaveBeenCalled();
    }, 100)
})

