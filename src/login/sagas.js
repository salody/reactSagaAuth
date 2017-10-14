import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { handleApiErrors } from '../lib/api-error';

// login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./constants";

// So that we can modify our Client piece of state
import {
  setClinet,
  unsetClinet
} from "../client/actions";

import {
  CLIENT_SET,
  CLIENT_UNSET
} from "../client/constants";

function loginApi() {

}

function* logout() {

}

function* loginFlow (email, password) {

}

function* loginWatch () {
  // Starting a loop.
  while (true) {
    // watching for the LOGIN_REQUESTING action
    const { email, password } = yield take(LOGIN_REQUESTING);

    // Fork a background task that will run loginFlow()。
    // 这个是异步的 不会阻止下面代码的进行。
    const task = yield fork(loginFlow, email, password);

    // Begin watching for CLIENT_UNSET and LOGIN_ERROR
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

    //  If the action.type is CLIENT_UNSET cancel our forked task of trying to login
    if (action.type === CLIENT_UNSET) yield cancel(task);

    // We log out the by calling to our logout function
    // Once we code that out, it will simply dispatch a CLIENT_UNSET action that will remove the data from our state, remove the token and redirect them to the login screen.
    yield call(logout);

    // once we've logged them back out.
    // the loop begins again and starts watching for LOGIN_REQUESTING! Because while(true) is surprisingly true, we start right back at the top and begin again.
  }
}

export default loginWatch;