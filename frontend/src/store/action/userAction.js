export const userPostsAction = (user) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const userId = user.id

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders,
    };

    const response = await fetch(`http://localhost:8000/api/social/posts/user/${userId}/`, config);
    const data = await response.json();

    const action = {
        type: "USER_POSTS",
        payload: data
    };

    dispatch(action);
}

export const userFriendsAction = (userProfile) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders,
    };

    const response = await fetch("http://localhost:8000/api/social/friends/", config);
    const data = await response.json();

    const action = {
        type: "USER_FRIENDS",
        payload: data,
        userId: userProfile.id
    };

    dispatch(action);
}


export const userFollowingAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders,
    };

    const response = await fetch("http://localhost:8000/api/social/followers/following/", config);
    const data = await response.json();

    const action = {
        type: "USER_FOLLOWING",
        payload: data
    };

    dispatch(action);
}


export const userFollowersAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders,
    };

    const response = await fetch("http://localhost:8000/api/social/followers/followers/", config);
    const data = await response.json();

    const action = {
        type: "USER_FOLLOWERS",
        payload: data
    };

    dispatch(action);
};


export const pendingFriendRequestAction = (user) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
   
    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "GET",
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/friend_requests/", config);
    const data = await response.json();

    const action = {
        type: "PENDING_FRIEND_REQUEST",
        payload: data,
        userId: user.id
    };

    dispatch(action);
};


export const rejectFriendRequestAction = (rejectUser) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const request_id = rejectUser.id_request

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: "DELETE",
        headers: myHeaders
    };

    await fetch(`http://localhost:8000/api/social/friends/requests/${request_id}/`, config);

    const action = {
        type: "REJECT_FRIEND_REQUEST",
        payload: rejectUser
    };

    dispatch(action);
};

export const aceptFriendRequestAction = (acceptUser) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const request_id = acceptUser.id_request

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const body = {
        "friendship_status": "accept"
    }

    const config = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    await fetch(`http://localhost:8000/api/social/friends/requests/${request_id}/`, config);

    const action = {
        type: "ACCEPT_FRIEND_REQUEST",
        payload: acceptUser
    };

    dispatch(action);
};
