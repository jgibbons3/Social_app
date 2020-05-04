export const profileAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "GET",
        headers: myHeaders
    }

    const response = await fetch("http://localhost:8000/api/users/me/", config);
    const data = await response.json()
    const action = {
        type: "USER_INFO",
        payload: data
    };

    dispatch(action);
};


export const allUsersAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers ({
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "GET",
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/users/", config);
    const data = await response.json();

    const action = {
        type: "DISPLAY_ALL_USERS",
        payload: data
    };

    dispatch(action);
};

export const followUserAction = (user) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers ({
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "POST",
        headers: myHeaders
    };

    const response = await fetch(`http://localhost:8000/api/social/followers/toggle-follow/${user.id}/`, config);
        await response.json();

    const action = {
        type: "FOLLOW_USER",
        payload: user
    };
   
    dispatch(action);
};

export const followingByUserAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = ({
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "GET",
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/followers/following/", config);
    const data = await response.json();
    
    const action = {
        type: "USER_FOLLOWING",
        payload: data
    };

    dispatch(action)
};

export const addFriendAction = (user) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = ({
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "POST",
        headers: myHeaders
    };

    const response = await fetch(`http://localhost:8000/api/social/friends/request/${user.id}/`, config);
        await response.json(); 
};


export const updateProfileAction = (updateData) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = ({
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "PATCH",
        headers: myHeaders,
        body: updateData
    };

    const response = await fetch(`http://localhost:8000/api/users/me/`, config);
        await response.json();

    const action = {
        type: "UPDATE_PROFILE",
        payload: updateData
    };

    dispatch(action)
};


