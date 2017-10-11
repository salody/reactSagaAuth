import { CLIENT_SET, CLIENT_UNSET} from './constants';

export function setClinet(token) {
  return {
    type: CLIENT_SET,
    token
  }
}

export function unsetClinet(token) {
  return {
    type: CLIENT_UNSET,
    token
  }
}