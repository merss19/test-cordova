import * as actions from './index'

describe('profile actions', () => {
  it('createProfile should create CREATE_PROFILE action', () => {
    expect(actions.createProfile('Use Redux')).toEqual({
      type: 'CREATE_PROFILE',
      text: 'Use Redux'
    })
  })
})
