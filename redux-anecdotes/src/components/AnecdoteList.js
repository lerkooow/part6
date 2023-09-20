import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

    const vote = (id) => {
        dispatch(voteAnecdote(id));
        console.log('vote', id);
    };

    const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Filter />
            {filteredAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
