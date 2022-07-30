const { createStore, combineReducers, applyMiddleware } = require('redux')
// applymiddleware is added to support Redux logger
// Redux logger can be installed by npm i redux-logger

const logger = require('redux-logger').default
const BUY_LAPTOP = 'BUY_LAPTOP'
const BUY_MOBILE = 'BUY_MOBILE'
// to run this file type node filename.js in terminal
// initial state
const initialState = {
  numberOfLaptops: 100,
  numberOfMobiles: 100,
}

//function returning an action- call this function to emit action
const buyLaptop = () => {
  return {
    type: BUY_LAPTOP,
  }
}

const buyMobile = () => {
  return {
    type: BUY_MOBILE,
  }
}

const windowShopping = () => {
  return {
    type: 'NONE',
  }
}

//reducer defined on state
const reducer = (state = initialState, action) => {
  // if (action.type === 'BUY_LAPTOP') {
  //   return { numberOfLaptops: state.numberOfLaptops - 1 }
  // } else {
  //   return state
  // }

  switch (action.type) {
    case BUY_LAPTOP:
      return {
        numberOfLaptops: state.numberOfLaptops - 1,
        numberOfMobiles: state.numberOfMobiles,
      }
    case BUY_MOBILE:
      return {
        numberOfLaptops: state.numberOfLaptops,
        numberOfMobiles: state.numberOfMobiles - 1,
      }
    default:
      return state
  }
}

// while creating store, pass ApplyMiddleWear as another argument and pass logger to it
const store = createStore(reducer, applyMiddleware(logger))
console.log(store)
// above created store when we log contains multiple functions as below:
// dispatch: [Function: dispatch],
// subscribe: [Function: subscribe],
// getState: [Function: getState],
// replaceReducer: [Function: replaceReducer],
// '@@observable': [Function: observable]
store.subscribe(() => {
  console.log(store.getState())
})

// const rootReducer = combineReducers({other reducer function 1, other reducer funtion 2})
store.dispatch(windowShopping())
store.dispatch(buyMobile())
store.dispatch(buyLaptop())
store.dispatch(buyLaptop())

store.dispatch(buyMobile())
store.dispatch(buyMobile())
store.dispatch(windowShopping())

// Redux logger can be installed by npm i redux-logger
// after installing redux logger we passed it as argument to applyMiddlewaer
