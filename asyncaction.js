import redux from 'redux'
import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState = {
      loading: false,
      user: [],
      error: ''
}

const FETCH_USERS_REQUEST = ' FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

const fetchUsersRequest = () => {
      return {
            type: FETCH_USERS_REQUEST
      }
}

const fetchUsersSuccess = (users) => {
      return {
            type: FETCH_USERS_SUCCESS,
            payload: users
      }
}

const fetchUsersError = (error) => {
      return {
            type: FETCH_USERS_ERROR,
            payload: error
      }
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case FETCH_USERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case FETCH_USERS_SUCCESS:
                  return {
                        loading: false,
                        users: action.payload,
                        error: ''
                  }
            case FETCH_USERS_ERROR:
                  return {
                        loading: false,
                        user: [],
                        error: action.payload
                  }
      }
}

const fetchUser = () => {
      return function (dispatch) {
            dispatch(fetchUsersRequest())
            axios.get('https://jsonplaceholder.typicode.com/users')
                  .then(response => {
                        const users = response.data
                        dispatch(fetchUsersSuccess(users))
                  })
                  .catch((error) => {
                        dispatch(fetchUsersError(error.message))

                  })
      }
}

const store = createStore(reducer, applyMiddleware(thunk))
store.subscribe(() => { console.log(store.getState()) })
dispatch(fetchUser)