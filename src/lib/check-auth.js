import { setClient } from "../client/actions";

function checkAuthorization (dispatch) {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    const token = JSON.parse(storedToken);
    const createdDate = new Date(token.created);
    const created = Math.round(createdDate.getTime() / 1000);
    // ttl (time to live)
    const ttl = 1209600;
    const expiry = created + ttl;

    // if the token has expired return false
    // todo 这里逻辑貌似有点问题
    if (created > expiry) return false;

    dispatch(setClient(token));
    return true
  }

  return false;
}

export function checkIndexAuthorization ({ dispatch }) {
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('widgets');

      return next()
    }
  }
}

export function checkWidgetAuthorization ({ dispatch, getState }) {
  return (nextState, replace, next) => {
    // reference to the `client` piece of state
    const client = getState().client;

    // is it defined and does it have a token? good, go ahead to widgets
    if (client && client.token) return next();

    // not set yet?  Let's try and set it and if so, go ahead to widgets
    if (checkAuthorization(dispatch)) return next();

    // nope?  okay back to login ya go.
    replace('login');
    return next()
  }
}