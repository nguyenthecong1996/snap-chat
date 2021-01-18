const INITIAL_STATE = {
    idMessage: null
};
 
export function chatSlice(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case 'SET_ID_MESSAGE':
            return {
                ...state,
                idMessage: action.idMessage
            }
        default:
            return state
    }
}