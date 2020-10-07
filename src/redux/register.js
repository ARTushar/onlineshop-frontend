import * as ActionTypes from './ActionTypes';

const Register = (state = {
    isLoading: false,
    hasRegsitered: false,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.REGISTER_REQUEST:
            return { ...state, isLoading: true };
        
        case ActionTypes.REGISTER_SUCCESS:
            return { ... state,
                isLoading: false,
                hasRegsitered: true,
                errMess: null
            }
        
        case ActionTypes.REGISTER_FAILURE:
            return { ...state, 
                isLoading: false,
                hasRegsitered: false,
                errMess: action.message
            }
        
        case ActionTypes.REGISTER_CLEAR:
            return { isLoading: false, hasRegistered: false, errMess: null };

        default:
            return state;
    }
}

export default Register;