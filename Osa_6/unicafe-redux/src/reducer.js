const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const updatedState = {
    ...state
  }
  switch (action.type) {
    case 'GOOD':
        updatedState.good++
      return updatedState
    case 'OK':
        updatedState.ok++
      return updatedState
    case 'BAD':
        updatedState.bad++
      return updatedState
    case 'ZERO':
      updatedState.good = 0
      updatedState.ok = 0
      updatedState.bad = 0
      return updatedState
    default: return state
  }
  
}

export default counterReducer