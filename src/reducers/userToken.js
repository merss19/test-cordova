export function userToken(state = 'RETURN_ERROR', action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        token: action.token,
      };
    default:
      return state;
  }
}
