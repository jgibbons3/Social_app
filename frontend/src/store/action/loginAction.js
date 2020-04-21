export const loginAction = (email, password) => async (dispatch, getState) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const body = {
        "email": email,
        "password": password
    }

    const config = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    const response =  await fetch("http://localhost:8000/api/auth/token/", config);
    const data = await response.json();

    localStorage.setItem('access', JSON.stringify(data));  //store info with setItem

    const action = {
        type: "LOGIN_USER",
        payload: data
    };
    dispatch(action);
    return response
};

export const setAuthenticated = () => {
    return {
        type: 'setAuthenticated',
        payload: false
    };
};