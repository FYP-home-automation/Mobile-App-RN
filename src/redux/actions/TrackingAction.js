import { SET_WIDTH, SET_LENGTH } from '../types';

export const setLength = num => ({
  type: SET_LENGTH,
  payload: num,
});

export const setWidth = num => ({
  type: SET_WIDTH,
  payload: num,
});
