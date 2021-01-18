const INITIAL_STATE = {
    cameraImage: null,
    user: null
};
 
export function appSlice(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    user: action.user,
                    profilePic: action.profilePic,
                    id: action.id
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        case 'SELECT_IMG':
            return {
                ...state,
                cameraImage: action.imageUrl
            }
        case 'RESET_IMG':
            return {
                ...state,
                user: null
            }        
        default:
            return state
    }
}