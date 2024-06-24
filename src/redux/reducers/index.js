import { LOGIN, LOGOUT } from '../actions';

// Initial state with user set to null
const initialState = {
    user: null,
};

// Reducer function to handle login and logout actions
const mainReducer = (state = initialState, action) => {
    console.log('Action received:', action); // Log to verify received actions
    switch (action.type) {
        case LOGIN:
            console.log('Setting user:', action.payload); // Log to verify the payload
            return {
                ...state,
                user: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export default mainReducer;
