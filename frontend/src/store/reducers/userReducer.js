const initialState = {
    userPosts: [],
    userFriends: [],
    userFollowing: [],
    userFollowers: [],
    pendingFriends: [],
    pendingRequests: []
}

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case "USER_POSTS":
            return {
                ...state,
                userPosts: action.payload
            };
       
        case "USER_FRIENDS":
            const userId = action.userId
            const newList = []
            
            action.payload.map(friend => {
                if(friend.requester_user.id !== userId) {
                    return newList.push({ ...friend.requester_user })
                } else {
                    return newList.push({ ...friend.receiver_user }) 
                }
            })

            return {
                ...state,
                userFriends: newList
            };

        case "PENDING_FRIEND_REQUEST":
            const user_Id = action.userId
            const pendingRequester = []
            const pendingReceiver = []
            
            action.payload.filter(friend => {
                if(friend.requester_user.id !== user_Id) {
                    return pendingRequester.push({ ...friend.requester_user, "id_request": friend.id })
                } else {
                    return pendingReceiver.push({ ...friend.receiver_user, "id_request": friend.id }) 
                }
            })

            return {
                ...state,
                pendingFriends: pendingRequester,
                pendingRequests: pendingReceiver
            };
        
        case "REJECT_FRIEND_REQUEST":
            const copyPF = [...state.pendingFriends]
            const newPendFriendsList = copyPF.filter(item => item.id !== action.payload.id )
        
            return {
                ...state,
                pendingFriends: newPendFriendsList,
            };

        case "ACCEPT_FRIEND_REQUEST":
            const copyFR = [...state.pendingFriends]
            const newFRList = copyFR.filter(item => item.id !== action.payload.id )
            const copyFriends = [...state.userFriends, action.payload]

            return {
                ...state,
                pendingFriends: newFRList,
                userFriends: copyFriends
            };

        case "USER_FOLLOWING":
            return {
                ...state,
                userFollowing: action.payload
            };

        case "USER_FOLLOWERS":
            return {
                ...state,
                userFollowers: action.payload
            };

        default:
            return state;
    };
};

export default userReducer;