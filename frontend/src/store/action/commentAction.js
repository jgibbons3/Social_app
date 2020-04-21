export const newCommentAction = (comment, postId) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const body = {
        "comment": comment
    }

    const config = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    const response = await fetch(`http://localhost:8000/api/social/comments/create/${postId}/`, config);
    const data = await response.json();
    console.log("nuevo comment data", data)
    const action = {
        type: "CREATE_COMMENT",
        payload: data
    };

    dispatch(action)
};


export const postCommentAction = (post) => async (dispatch, getState) => {
    const token = getState().loginReducer.tokens.access;
    const postId = post.id

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const config = {
        method: 'GET',
        headers: myHeaders,
    };

    const response = await fetch(`http://localhost:8000/api/social/comments/${postId}/`, config);
    const data = await response.json();
   
    return data
};

