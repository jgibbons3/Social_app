export const postAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/posts/", config);
    const data = await response.json();
    const action = {
        type: "GET_ALL_POSTS",
        payload: data
    };

    dispatch(action);
};


export const newPostAction = (newPost) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
    "content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    });

    const body = {
        content: newPost
    };

    const config = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    const response = await fetch("http://localhost:8000/api/social/posts/list_posts/", config);
    const data = await response.json();
   
    const action = {
        type: "NEW_POST",
        payload: data
    };

    dispatch(action);
};


export const postsLikedAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/posts/likes/", config)
    const data = await response.json();

    const action = {
        type: "GET_LIKED_POSTS",
        payload: data
    };
    
    dispatch(action);
};

export const postsFollowAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/posts/following/", config)
    const data = await response.json();

    const action = {
        type: "GET_FOLLOW_POSTS",
        payload: data
    }

    dispatch(action); 
};

export const postsFriendsAction = () => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/api/social/posts/friends/", config)
    const data = await response.json();

    const action = {
        type: "GET_FRIENDS_POSTS",
        payload: data
    }

    dispatch(action); 
};

export const likePostAction = (postId) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const post_id = postId;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'POST',
        headers: myHeaders
    };

    const response = await fetch(`http://localhost:8000/api/social/posts/toggle-like/${postId}/`, config);
    await response.json();
    
    const action = {
        type: "LIKE_DISLIKE",
        payload: post_id
    };
    
    dispatch(action);
};


export const deletePostAction = (postId) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const post_id = postId;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'DELETE',
        headers: myHeaders
    };

    await fetch(`http://localhost:8000/api/social/posts/${postId}/`, config);
    
    const action = {
        type: "DELETE_POST",
        payload: post_id
    };
    
    dispatch(action);
};

export const updatePostAction = (post, content) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const postId = post.id

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const body = {
        "content": content
    }

    const config = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    const response = await fetch(`http://localhost:8000/api/social/posts/${postId}/`, config);
    const data = await response.json();
    
    const action = {
        type: "UPDATE_POST",
        payload: data
    };
    
    dispatch(action);
};

