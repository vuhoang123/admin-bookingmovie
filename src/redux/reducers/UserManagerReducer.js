import { SET_USER_INFO, SET_USER_LIST } from "../types";

const initialState = {
  userList: [],
  userInfo: {},
};

export const UserManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LIST:
      state.userList = action.payload;
      return { ...state };
    case SET_USER_INFO:
      state.userInfo = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
