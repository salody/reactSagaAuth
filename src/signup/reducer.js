import { SIGNUP_REQUESTING } from "./constants";

const initialState = {
  requesting: false,   // 发起一个注册请求
  successful: false,   // 注册请求成功
  messages: [],        // array of messages to show the user
  errors:[]            // an array of error messages just in case there are more than 1
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        ...state,
        requesting: true,
        messages: [{
          body: 'Signing up...',
          time: new Date()
        }]
      };
    default:
      return state;
  }
};

export default signupReducer;