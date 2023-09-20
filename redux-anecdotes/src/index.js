import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { combineReducers } from 'redux';
import filterReducer from './reducers/filterReducer';
import anecdoteReducer from './reducers/anecdoteReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});
const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

