const { createStore } = require('redux')
// to run this file type node filename.js in terminal
// initial state
const initialState = {
  numberOfLaptops: 100,
}

//function returning an action- call this function to emit action
const buyLaptop = () => {
  return {
    type: 'BUY_LAPTOP',
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
    case 'BUY_LAPTOP':
      return { numberOfLaptops: state.numberOfLaptops - 1 }
    default:
      return state
  }
}

const store = createStore(reducer)
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

store.dispatch(buyLaptop())
store.dispatch(buyLaptop())
