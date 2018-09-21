import { STATUS_FAILURE, STATUS_LOADING, STATUS_SUCCESS } from '../actionTypes'
const initialState = {
  data: [], error: undefined, isLoading: false
}

export default UploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_LOADING:
      return {
        ...initialState, isLoading: true
      }
    case STATUS_SUCCESS:
      return {
        ...initialState, isLoading: false, data: action.payload
      }
    case STATUS_FAILURE:
      return {
        ...initialState, isLoading: false, error: action.payload
      }
    default:
      return initialState
  }
}