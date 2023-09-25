import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../request'


// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ notificationDispatch }) => {


  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.error('Error creating anecdote:', error)
    },
  })

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      console.log('new anecdote')
      notificationDispatch({ type: "CREATE", anecdote: content })
      setTimeout(() => {
        notificationDispatch("");
      }, 5000);
    } else {
      notificationDispatch({ type: "ERROR", message: "too short anecdote, must have length 5 or more" })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
