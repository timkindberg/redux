import { createAction } from 'redux-act'

export function createActionAsync(description, api, options = {}) {

  const actions = {
    request: createAction(`${description}_REQUEST`, options.payloadReducer, options.metaReducer),
    ok: createAction(`${description}_OK`, options.payloadReducer, options.metaReducer),
    error: createAction(`${description}_ERROR`, options.payloadReducer, options.metaReducer)
  }

  const actionAsync = (payload) => {
    return (dispatch, getState) => {
      const dispatchers = {
        request: (p) => dispatch(actions.request(p)),
        ok: (p) => dispatch(actions.ok(p)),
        error: (err) => {
          dispatch(actions.error(err))
          throw err
        }
      }

      return api(dispatchers, payload, getState);
    }
  }

  actionAsync.request = actionAsync.toString = actions.request;
  actionAsync.ok = actions.ok;
  actionAsync.error = actions.error;

  return actionAsync;
};