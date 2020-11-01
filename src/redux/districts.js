import * as ActionTypes from './ActionTypes';

export const selectDistricts = (districts) => {
  return districts.map(district => ({ value: district.name, label: district.name + ' (' + district.banglaName + ')', deliveryCost: district.deliveryCost }))
}


const Districts = (state = {
  districts: [],
  isLoading: false,
  errMess: null,
  hasLoaded: false
}, action) => {
  switch(action.type){
    case ActionTypes.FETCH_DISTRICTS_REQUEST:
      return {...state, isLoading: true }
    
    case ActionTypes.FETCH_DISTRICTS_FAILURE:
      return {...state, isLoading: false, errMess: action.errMess}
    
    case ActionTypes.FETCH_DISTRICTS_SUCCESS:
      return {...state, isLoading: false, errMess: null, hasLoaded: true }
    
    case ActionTypes.ADD_DISTRICTS:
      return {...state, districts: action.payload}
    
    default:
      return state;
  }
}

export default Districts;