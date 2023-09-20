import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import Notification from './Notification';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

    const vote = (id, content) => {
        dispatch(voteAnecdote(id));
        dispatch(setNotification(`you voted '${content}'`));
    };

    const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
        anecdote?.content?.toLowerCase().includes(filter.toLowerCase()) ?? false
    );

    return (
        <div>
            <Notification />
            <Filter />
            {filteredAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
