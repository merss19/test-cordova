export function profile(state = 'DO_NOT_CREATE', action) {
  switch (action.type) {
    case 'CREATE_PROFILE':
      return {
        text: action.text,
      }
    case 'SIGNUP':
      return {
        program: action.program,
        amount: action.amount,
        packageType: action.packageType
      }
    default:
      return state
  }
}
