import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./constants";
import { handleApiErrors } from '../lib/api-error';

function loginApi() {

}


function* loginFlow (action) {
  try {
    const { email, password } = action;
    const response = yield call(loginApi, email, password);
    yield put({ type: LOGIN_SUCCESS, response })
  } catch(error) {
    yield put({ type: LOGIN_ERROR, error})
  }
}

function* loginWatch () {
  yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

export default loginWatch;