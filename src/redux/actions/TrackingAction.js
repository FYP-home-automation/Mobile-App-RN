import { SET_WIDTH, SET_LENGTH, SET_FLOORPLAN, SET_LOADING } from '../types';

export const setLength = num => ({
  type: SET_LENGTH,
  payload: num,
});

export const setWidth = num => ({
  type: SET_WIDTH,
  payload: num,
});

export const setFloorPlan = jsonData => ({
  type: SET_FLOORPLAN,
  payload: jsonData,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});
