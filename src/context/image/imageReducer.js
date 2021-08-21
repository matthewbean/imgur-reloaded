import {
  RELOAD,
  LOAD_ALBUM,
  EXIT_FULLSCREEN,
  SET_LOADING,
  CLEAR_PAGE,
  LOAD_COMMENTS,
  SET_INDEX
} from './types';

export default (state, action) => {
  switch (action.type) {
    case RELOAD:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case CLEAR_PAGE:
      return {
        ...state,
        data: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_INDEX:
      return {
        ...state,
        index: action.payload
      };
    case LOAD_ALBUM:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case EXIT_FULLSCREEN:
      return {
        ...state,
        current: null,
        fullscreen: false,
        loading: false
      };
    default:
      return state;
  }
};
