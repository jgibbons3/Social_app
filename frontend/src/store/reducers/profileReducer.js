const initialState = {
    userProfile: [],
    allUsers: [],
    followingByUser: [],
}

const profileReducer = function (state = initialState, action) {
    switch (action.type) {
        case "USER_INFO":
            return {
                ...state,
                userProfile: action.payload
            };

        case "UPDATE_PROFILE":
            const newProfile = Object.keys(action.payload)
            const newUSerProfile = { ...state.userProfile, ...newProfile }

            // const newImage = {image: `http://localhost:8000${newUSerProfile.image}`}
            // console.log("update user reducer", newUSerProfile)
            // console.log("update image reducer", newImage)
            return {
                ...state,
                userProfile: newUSerProfile
            }

        case "LIKE_DISLIKE":
            const likedPosts = state.userProfile.like_post;

            const userLikes = likedPosts.includes(action.payload) ? 
                likedPosts.filter( item =>  item !== action.payload ) :
                [...likedPosts, action.payload]
           
            const newUserprofile = { ...state.userProfile, like_post: userLikes }
            return {
                ...state,
                userProfile: newUserprofile
            };

        case "DISPLAY_ALL_USERS":
            return {
                ...state,
                allUsers: action.payload              
            };

        case "FOLLOW_USER":
            const copyList = [...state.followingByUser];
            const listIdFollowing = []

                copyList.map(item => {
                    return listIdFollowing.push(item.id)
                })

            const userFollowing = listIdFollowing.includes(action.payload.id) ?
                copyList.filter( item => item.id !== action.payload.id) :
                [...copyList, action.payload]
            return {
                ...state,
                followingByUser: userFollowing
            };

        case "USER_FOLLOWING":
            return {
                ...state,
                followingByUser: action.payload
            };
       
        default:
            return state;
    };
};

export default profileReducer;