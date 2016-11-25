/**
 * Created by Kevin on 2016/11/15.
 */
import {TAKE_PHOTO_BEGIN,TAKE_PHOTO_SOURCE,CHANGE_TITLE,SET_FRAME} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case TAKE_PHOTO_BEGIN:
      return objectAssign({}, state, {isTakePhoto: action.isTakePhoto});
    case TAKE_PHOTO_SOURCE:
      return objectAssign({}, state, {photo: action.photo});
    case CHANGE_TITLE:
      return objectAssign({}, state, {title: action.title});
    case SET_FRAME:
      return objectAssign({}, state, {width: action.width,height: action.height});
    default:
      return state;
  }
}
