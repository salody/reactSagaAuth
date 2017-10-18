import {setClient} from "../client/actions";

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({
        created: '2017-10-14T17:11:21.112Z',
        id: '12345',
        token: 'thisIsFakeToken'
      })
    }, 500);
  });
}

function* updateToken() {
  // 模拟fetch
  let token = yield fakeFetch();
  localStorage.setItem('token', token)
  return token;
}

function checkAuthorization(dispatch) {
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

    /** todo token自动刷新
     * 将token保存在localStorage中，如果过期的话直接类似App一样刷新token
     * 将新的token保存在localStorage中，使用新的token直接登录。
     * 不用返回登录页面
     */
    // 这里给他保存了token，而token过期的话，直接刷新token
    // if (created > expiry) {
    //   co(function* () {
    //     let token = yield updateToken();
    //     dispatch(setClient(token));
    //   })
    // }

    return true
  }

  return false;
}

export function checkIndexAuthorization({dispatch}) {
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('widgets');

      return next()
    }
  }
}

export function checkWidgetAuthorization({dispatch, getState}) {
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