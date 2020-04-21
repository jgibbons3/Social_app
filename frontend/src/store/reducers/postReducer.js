const initialState = {
    allPosts: [],
    likedPosts: [],
    followPosts: [],
    friendsPosts: []
}

const postReducer = function (state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_POSTS":
            return {
                ...state,
                allPosts: action.payload
            };
       
        case "NEW_POST":

            return {
                ...state,
                allPosts: [ ...state.allPosts, action.payload]
            };

        case "GET_LIKED_POSTS":
            return {
                ...state,
                likedPosts: action.payload
            };

        case "GET_FOLLOW_POSTS":
            return {
                ...state,
                followPosts: action.payload
            }

        case "GET_FRIENDS_POSTS":
            return {
                ...state,
                friendsPosts: action.payload
            }

        case "DELETE_POST":
            const copyPosts = [...state.allPosts]
            const filterPosts = copyPosts.filter( post => post.id !== action.payload ) 
            const copyLikedPosts = [...state.likedPosts]
            const filterLikedPosts = copyLikedPosts.filter( post => post.id !== action.payload ) 
            return {
                ...state,
                allPosts: filterPosts,
                likedPosts: filterLikedPosts
            }

        case "UPDATE_POST":
            // will edit only the allPost, modify object by reference
            const newEditAllPosts = [ ...state.allPosts] 
            const indexEditAllPost = newEditAllPosts.findIndex(post => post.id === action.payload.id) 
            const editAllPost = newEditAllPosts[indexEditAllPost] //make a copy from post i want to edit
            editAllPost.content = action.payload.content //change content
        
            return {
                ...state,
                allPosts: newEditAllPosts,
            }

        default:
            return state;
    };
};

export default postReducer;