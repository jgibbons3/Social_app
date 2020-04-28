import React from "react";
import ReactDOM from "react-dom";
import { Login } from "../components/Login/Login";


it("login component render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div)
})


it("renders button login with correct text content", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div)
    const button = div.querySelector('#login_button')
    expect(button.textContent).toBe('Login')
})