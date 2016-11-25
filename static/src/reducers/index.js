import { combineReducers } from 'redux';
import image from './imageReducer';
import ui from './uiReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  image,
  ui,
  routing: routerReducer
});

export default rootReducer;
