
import redux from 'redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

// action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'


// Action creator
function buyCake() {
      return {
            type: BUY_CAKE,
            info: 'My first redux demo'
      }
}

function buyIceCream() {
      return {
            type: BUY_ICECREAM
      }
}

// with the reducers functions, it takes the previous state and action as argument and returns a new state
// (previousState, action) => newState

// const initialState = {
//       numberOfCakes = 10,
//       numberOfIceCream = 20
// }

const initialCakes = {
      numberOfCakes: 10,
}

const initialIceCream = {
      numberOfIceCream: 20
}

const cakeReducer = (state = initialCakes, action) => {
      switch (action.type) {
            case BUY_CAKE: return {
                  ...state,
                  numberOfCakes: state.numberOfCakes - 1,
                  info: action.info
            }

            default:
                  return state
      }
}

const IceCreamReducer = (state = initialIceCream, action) => {
      switch (action.type) {
            case BUY_ICECREAM: return {
                  ...state,
                  numberOfIceCream: state.numberOfIceCream - 1
            }

            default:
                  return state
      }
}


const rootReducer = combineReducers({
      cake: cakeReducer,
      iceCream: IceCreamReducer
})



const store = createStore(rootReducer)
console.log('Initial quantity of cakes', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe()