export function createActionConditional(description, conditions, options = {}) {
  const action = createAction(description, options.payloadReducer, options.metaReducer)
  conditions = Array.isArray(conditions) ? conditions : [conditions]

  let conditionalAction = (payload) => {
    return (dispatch, getState) => {
      if (conditions.every(condition => condition(getState()))) {
        dispatch(action(payload));
      }
    }
  }

  conditionalAction.ok = conditionalAction.toString = action

  return conditionalAction;
}