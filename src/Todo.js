import React from 'react'
import { ACTIONS } from './App'

const Todo = ({ todo, dispatch }) => {

return (
    <div>
        <span style={{ color: todo.complete ? '#AAA' : '#000'}}>
            { todo.name }
        </span>
        <button className="border-2" onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO,
        payload: { id: todo.id}})}>Complete/Not Complete</button>
        <button className="border-2" onClick={() => dispatch({ type: ACTIONS.DELETE_TODO,
        payload: { id: todo.id}})}>Delete</button>
    </div>
)

}
export default Todo