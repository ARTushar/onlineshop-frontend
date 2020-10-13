import * as ActionTypes from './ActionTypes';

const InitialUserState = {
  name: '',
  mobile: '',
  email: '',
  address: {
    country: 'Bangladesh',
    district: 'Dhaka',
    thana: '',
    region: '',
    postalCode: null,
    homeLocation: ''
  }
};


const User = (state = {
  profileInformation: InitialUserState,
  isLoading: false,
  errMess: null,
  hasLoaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOAD:
      return {...state, hasLoaded: true }

    case ActionTypes.ADD_PROFILE:
      return { ...state, profileInformation: action.payload }

    case ActionTypes.FETCH_PROFILE_REQUEST:
      return { ...state, isLoading: true }

    case ActionTypes.FETCH_PROFILE_SUCCESS:
      return { ...state, isLoading: false, errMess: null }

    case ActionTypes.FETCH_PROFILE_FAILURE:
      return { ...state, isLoading: false, errMess: action.errMess }

    case ActionTypes.REMOVE_PROFILE:
      return { profileInformation: InitialUserState, isLoading: false, hasLoaded: false, errMess: null}
      
    default:
      return state;
  }
}

export default User;