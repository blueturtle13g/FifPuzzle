import {CHANGE_LEVEL, TOGGLE_NUMBERS,} from './types';

export const toggleNumbers = no=>{
  return{
      type: TOGGLE_NUMBERS,
      payload: no
  }
};

export const changeLevel = level=>{
  return{
      type: CHANGE_LEVEL,
      payload: level
  }
};