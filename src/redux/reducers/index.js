import { LOGIN, LOGOUT } from '../actions';

const initialState = {
    user: null,
};

const mainReducer = (state = initialState, action) => {
    console.log('Action received:', action); // Log per verificare le azioni ricevute
    switch (action.type) {
        case LOGIN:
            console.log('Setting user:', action.payload); // Log per verificare il payload
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
