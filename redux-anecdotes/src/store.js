import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer';
import anecdoteReducer, { appendAnecdote, setAnecdotes } from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import anecdoteService from './services/anecdotes';

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

anecdoteService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
        store.dispatch(appendAnecdote(anecdote))
    })
)

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
)

export default store;
