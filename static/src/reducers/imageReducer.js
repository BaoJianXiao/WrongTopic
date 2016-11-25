import {TAKE_CROP,GET_LIST_FOR_TYPE} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function imageReducer(state = initialState.image, action) {
  switch (action.type) {
    case TAKE_CROP:
      return objectAssign({}, state, {crop: action.crop});
    case GET_LIST_FOR_TYPE:
      console.log(action.currentList)
      return objectAssign({}, state, {currentList: action.currentList});
    default:
      return state;
  }
}
