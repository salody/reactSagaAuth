import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "./constants";

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
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: []
      };

    // reset the state and add a body message of success
    // successfully returned payload will be:
    // {"email": "of the new user", "id": "of the new user"}
    case  SIGNUP_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [{
          body: `Successfully created account for ${action.response.email}`,
          time: new Date()
        }],
        errors: []
      };

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case SIGNUP_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: [
          ...state.errors,
          {
            body: action.error.toString(),
            time: new Date()
          }
        ]
      };

    default:
      return state;
  }
};

export default signupReducer;