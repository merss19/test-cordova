export function profile(state = 'DO_NOT_CREATE', action) {
  switch (action.type) {
    case 'CREATE_PROFILE':
      return {
        text: action.text,
      };
    default:
      return state;
  }
}
