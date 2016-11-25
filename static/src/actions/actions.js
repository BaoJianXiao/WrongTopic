import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';
export function takePhoto(value) {
  return {type: types.TAKE_PHOTO_BEGIN, isTakePhoto: value};
}
export function takePhotoSource(src) {
  return {type: types.TAKE_PHOTO_SOURCE, photo: src};
}
export function changeTitle(title) {
  return {type: types.CHANGE_TITLE, title: title};
}

export function takeCrop(value) {
  return {type: types.TAKE_CROP, crop: value};
}

export function setFrame(w, h) {
  return {type: types.SET_FRAME, width: w, height: h};
}
export function getQuestionForType(type,pageIndex,pageSize) {
  return dispatch => {
    fetch("/listForType", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageIndex:pageIndex,
        pageSize:pageSize,
        type:type
      })
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.success != null && response.success) {
          return dispatch({
            type:types.GET_LIST_FOR_TYPE,
            currentList:response.data
          })
        }
      });
    return dispatch({
      type:types.GET_LIST_FOR_TYPE,
      currentList:[]
    })
  };
}
export function saveQuestion(data) {
  return dispatch => {
    fetch("/create", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.success != null && !response.success) {
          return dispatch({
            type:'',
            data: response.data
          });
        }
      });
  }}

export function createLogQs(data,callback) {
  return dispatch => {
    fetch("/listForQuery", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) =>{
        if (response.success != null && response.success) {
          if(callback)callback(true, response.data);
          return dispatch({
            type:'',
            data: response.data
          });
        }else{
          if(callback)callback(false);
        }});
  }}
export function createLogQuestion(data,callback) {
  return dispatch => {
    fetch("/createLogQuestion", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) =>{
        if (response.success != null && response.success) {
          if(callback)callback(true);
          return dispatch({
            type:'',
            data: response.data
          });
        }else{
          if(callback)callback(false);
        }});
}}
export function logs(data,callback) {
  return dispatch => {
    fetch("/logs", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) =>{
        if (response.success != null && response.success) {
          if(callback)callback(true,response.data);
          return dispatch({
            type:'',
            data: response.data
          });
        }else{
          if(callback)callback(false);
        }});
  }}
export function logQuestions(data,callback) {
  return dispatch => {
    fetch("/getLogQuestion", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) =>{
        if (response.success != null && response.success) {
          if(callback)callback(response.data);
          return dispatch({
            type:'',
            data: response.data
          });
        }else{
          if(callback)callback(false);
        }});
  }}
