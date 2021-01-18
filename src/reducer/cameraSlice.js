const INITIAL_STATE = {
    cameraImage: null
};
 
export function cameraSlice(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CAMERA_IMAGE':
            return {
                ...state,
                cameraImage: action.imageSrc
            }
        case 'REMOVE_CAMERA_IMAGE':
            return {
                ...state,
                cameraImage: null
            }    
        default:
            return state
    }
}