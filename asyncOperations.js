// import redux libraries
const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const axios = require('axios')

// constants and variables
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAIL = 'FETCH_USER  S_FAIL'

//initial state to be used
const initialState = {
  users: [],
  error: '',
  isLoading: false,
}

// action functions
function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  }
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  }
}

function fetchUserFailre(error) {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  }
}

// reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_USERS_SUCCESS:
      return { isLoading: false, users: action.payload, error: '' }
    case FETCH_USERS_FAIL:
      return { isLoading: false, users: '', error: action.payload }
    default:
      state
  }
}

// separate function to call axios
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        let users = response.data
        dispatch(fetchUserSuccess(users))
      })
      .catch((error) => {
        dispatch(fetchUserFailre(error))
      })
  }
}

const store = createStore(userReducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUser())
