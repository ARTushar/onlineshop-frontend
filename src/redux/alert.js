import * as ActionTypes from './ActionTypes';


const Alert = (state = {
    type: 'success',
    message: '',
    open: false
}, action) => {
    switch(action.type){
        case ActionTypes.SET_ALERT_MESSAGE:
            return {type: action.alertType, message: action.message, open: action.open}
        
        case ActionTypes.SET_ALERT_OPEN:
            return {...state, open: action.open}
        
        default:
            return state;
    }
}

export default Alert;