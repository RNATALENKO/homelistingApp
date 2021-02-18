
import {REGISTER_SUCCESS, LOGIN_SUCCESS, 
        LOGIN_FAILURE, REGISTER_FAILURE} from '../Redux/AuthActions';

const initialState = {
    currentUser: {},
    errors: {},
};

export const AuthReducer = (state = initialState, action) => {
    //success reducer will just at current User data to global state
    switch(action.payload){
        case REGISTER_SUCCESS:
            return{
                ...state,
                currentUser: action.payload
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                currentUser:action.payload
            } 
        case LOGIN_FAILURE:
            return{
                ...state,
                errors:action.payload,
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                errors:action.payload,
            }
    }
    return state; 
}
 