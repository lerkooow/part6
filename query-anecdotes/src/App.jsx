import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from "../src/request"
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `anecdote "${action.anecdote}" voted`
    case "CREATE":
        return `anecdote "${action.anecdote}" created`
    default:
        return ""
  }
}


const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: "VOTE", anecdote: anecdote.content })
    setTimeout(() => {
      notificationDispatch("");
    }, 5000);
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {result.data ?
      <div>
      <h3>Anecdote app</h3>
      <Notification notification={notification}/>
      <AnecdoteForm notificationDispatch={notificationDispatch} />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div> :
    <p>anecdote service not available due to problems in server</p>}
    </div>
  )
}

export default App
