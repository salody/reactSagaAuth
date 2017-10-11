import { CLIENT_SET, CLIENT_UNSET} from './constants';

// the initialState gives us an outline of what our Client will look like state wise.
const initialState = {
  id: null,
  token: null
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_SET:
      return {
        id: action.token.userId,
        token: action.token
      };

    case CLIENT_UNSET:
      return {
        id: null,
        token: null
      };

    default:
      return state;
  }
};

export default clientReducer;