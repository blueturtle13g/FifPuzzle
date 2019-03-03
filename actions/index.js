import {
    CHANGE_LEVEL,
    TOGGLE_NUMBERS,
    SET_NEW_RECORD,
    UPDATE_PROP,
    SHAKE
} from './types';

export const toggleNumbers = no=>{
  return{
      type: TOGGLE_NUMBERS,
      payload: no
  }
};

export const updateProp = (keyVal)=>{
    return{
        type: UPDATE_PROP,
        payload: keyVal
    }
};

export const setNewRecord = ()=>{
    return{
        type: SET_NEW_RECORD
    }
};

export const changeLevel = level=>{
  return{
      type: CHANGE_LEVEL,
      payload: level
  }
};

export const shake = ()=>{
  return{
      type: SHAKE
  }
};