import { takeLatest } from 'redux-saga/effects';
import { SIGNUP_REQUESTING } from "./constants";

// This will be run when the SIGNUP_REQUESTING Action is found by watcher
function* signupFlow (action) {

}

// Watches for the SIGNUP_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function* signupWatcher() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher;