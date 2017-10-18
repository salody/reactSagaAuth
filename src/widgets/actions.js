import {
  WIDGET_CREATING,
  WIDGET_CREATE_SUCCESS,
  WIDGET_CREATE_ERROR,
} from './constants';

export const widgetCreate = (client, widget) => {
  return {
    type: WIDGET_CREATING,
    client,
    widget
  }
};

export const widgetCreateSuccess = function widgetCreateSuccess (widget) {
  return {
    type: WIDGET_CREATE_SUCCESS,
    widget,
  }
};

export const widgetCreateError = function widgetCreateError (error) {
  return {
    type: WIDGET_CREATE_ERROR,
    error,
  }
};