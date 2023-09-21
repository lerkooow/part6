import { createSlice } from '@reduxjs/toolkit';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find(n => n.id === id)

      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload;
      newAnecdote.votes = 0;
      state.push(newAnecdote);
    }, appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
});

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
