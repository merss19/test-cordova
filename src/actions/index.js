export * from './taskDay'
export * from './signupPayment'
export * from './profile'

export const CREATE_PROFILE = 'CREATE_PROFILE'
export const SET_TOKEN      = 'SET_TOKEN'
export const SIGNUP         = 'SIGNUP'

export const createProfile = text => ({
  type: CREATE_PROFILE,
  text
})

// export const togleMenuMobLeft = visible => ({
//   type: CREATE_PROFILE,
//   text
// })

export const signup = (program, amount, packageType, promo) => {
  console.log('===//===========>')
  console.log(program)
  return ({
    type: SIGNUP,
    program,
    promo,
    amount,
    packageType
  })
}

export const setToken = token => ({
  type: SET_TOKEN,
  token
})
