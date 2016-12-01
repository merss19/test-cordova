const insuranceDoc = (state, action) => {
  switch (action.type) {
    case 'ADD_INSURANCE_DOC':
      return {
        name: action.name,
        uid: action.uid
      }
    default:
      return state
  }
}

export const insuranceDocs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INSURANCE_DOC':
      return [
        ...state,
        insuranceDoc(undefined, action)
      ]
    case 'SAVE_INSURANCE_DOCS':
      return action.bodyMeasure
    default:
      return state
  }
}
