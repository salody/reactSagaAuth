import {
  WIDGET_CREATE_ERROR,
  WIDGET_CREATE_SUCCESS,
  WIDGET_CREATING
} from "./constants";

const initialState = {
  list: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case WIDGET_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Widget: ${action.widget.name} being created...`,
          time: new Date()
        }],
        errors: []
      };

    case WIDGET_CREATE_SUCCESS:
      return {
        list: [...state.list, action.widget],
        requesting: false,
        successful: true,
        messages: [{
          body: `Widget: ${action.widget.name} created!`,
          time: new Date()
        }]
      };

    case WIDGET_CREATE_ERROR:
      return {
        ...state,
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

export default widgetReducer;