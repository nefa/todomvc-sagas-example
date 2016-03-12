import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import { 
  addSaga, 
  deleteSaga,
  editSaga, 
  addTodo,
  deleteTodo,
  editTodo 
} from '../sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware(
    ...[ addSaga, deleteSaga, editSaga, addTodo, deleteTodo, editTodo ]
  )

  const store = createStore(
    rootReducer, 
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
