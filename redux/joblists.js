import * as ActionTypes from './ActionTypes';

export const joblists = (
  state = { isLoading: true, errMess: null, joblists: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_JOBLISTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        joblists: action.payload,
      };

    case ActionTypes.JOBLISTS_LOADING:
      return { ...state, isLoading: true, errMess: null, joblists: [] };

    case ActionTypes.JOBLISTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
