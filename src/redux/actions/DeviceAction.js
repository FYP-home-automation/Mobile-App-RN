import { ADD_NEW_DEVICE_SUCCESSFULLY, ADD_NEW_DEVICE_FAILED } from '../types';
import { axiosInstance } from 'HomeAutomation/src/utils/API';

export const addNewDevice = ({ name, device_type, activeRoomId }) => {
  return async function (dispatch) {
    try {
      const address = 'test Address';
      const result = await axiosInstance.post('/device', {
        name,
        device_type,
        address,
      });
      dispatch({
        type: ADD_NEW_DEVICE_SUCCESSFULLY,
        payload: result.data,
        activeRoomId: activeRoomId,
      });
    } catch (e) {
      dispatch({
        type: ADD_NEW_DEVICE_FAILED,
      });
    }
  };
};
