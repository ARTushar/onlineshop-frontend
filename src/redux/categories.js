import * as ActionTypes from './ActionTypes';


const Categories = (state = {
  categories: [],
  isLoading: false,
  errMess: null,
  hasLoaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY_LOADED:
      return { ...state, hasLoaded: true }

    case ActionTypes.ADD_CATEGORIES:
      return { ...state, categories: action.payload }

    case ActionTypes.FETCH_CATEGORIES_REQUEST:
      return { ...state, isLoading: true }

    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, errMess: null }

    case ActionTypes.FETCH_CATEGORIES_FAILURE:
      return { ...state, isLoading: false, errMess: action.errMess }

    default:
      return state;
  }
}

export default Categories;