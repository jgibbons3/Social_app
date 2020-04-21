const initialState = {
    comment: [],
}

const commentReducer = function (state = initialState, action) {
    switch (action.type) {
        case "CREATE_COMMENT":
            return {
                ...state,
                comment: action.payload
            };
                      
        default:
            return state;
    }
};

export default commentReducer;