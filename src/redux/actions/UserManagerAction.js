import { userManagerService } from "../../services/UserManagerService";
import { SET_USER_INFO, SET_USER_LIST } from "../types";

export const fetchUserListAction = (key = "") => {
  return async (dispatch) => {
    try {
      const res = await userManagerService.fetchUserList(key);
      dispatch({
        type: SET_USER_LIST,
        payload: res.data.content,
      });
    } catch (error) {
      alert(error.response.data.content);
    }
  };
};

export const addNewUserAction = (values, AddUsersuccess) => {
  return async (dispatch) => {
    try {
      const res = await userManagerService.addNewUser(values);
      alert("add user successfull");
      AddUsersuccess();
      dispatch(fetchUserListAction());
    } catch (error) {
      alert(error.response.data.content);
    }
  };
};

export const deleteUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await userManagerService.deleteUser(taiKhoan);
      alert("delete user successfull");
      dispatch(fetchUserListAction());
    } catch (error) {
      alert(error.response.data.content);
    }
  };
};

export const getUserInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await userManagerService.getUserInfo(taiKhoan);
      dispatch({
        type: SET_USER_INFO,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("get User info fail", error.response.data.content);
    }
  };
};

export const updateUserAction = (values, UpdateUsersuccess) => {
  return async (dispatch) => {
    try {
      const res = await userManagerService.updateUser(values);
      alert("update user successful");
      UpdateUsersuccess();
      dispatch(fetchUserListAction());
    } catch (error) {
      alert(error.response?.data);
    }
  };
};
