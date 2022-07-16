import './App.css';
import {useReducer, useState} from "react";
import Todo from "./Todo";

// "The idea behind useReducer is it gives you a more concrete way to handle complex state so it gives you to set
//      actions that you can perform on your state and it's going to convert your current state to a new version of the
//      state based the action you send it."
// useReducer allows you to handle more COMPLEX state so we are going to change this counter to use the useReducer hook
// INSTEAD of useState
// useReducer is better for more complex cases that use nested components that you have to pass props down into
// **LOOK AT TO-DO LIST BELOW TO SEE IT IN ACTION


export const ACTIONS = {
    ADD_TODO: 'add-todo',
    // marks complete or not complete
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo'
}

function App() {
// --------------------------------------------PROGRAM USING USESTATE--------------------------------------------------
    // const [count, setCount] = useState(0);
    //
    // const increment = () => {
    //     // this VV arrow function automatically returns prevCount => prevCount + 1
    //     setCount(prevCount => prevCount + 1);
    // }
    //
    // const decrement = () => {
    //     setCount(prevCount => prevCount - 1);
    // }
    //
    // return (
    //
    //     <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center mt-8 border-2 border-solid border-blue-700">
    //         <div className="flex justify-center">
    //                 <span className="mt-2 text-4xl flex justify-center border-2 border-solid border-blue-700 text-red-700">
    //                     {count}
    //                 </span>
    //         </div>
    //         <div className="flex justify-center space-x-2 mt-2 mb-2">
    //             <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={increment}>
    //                 <span className="flex-1">UP</span>
    //             </button>
    //             <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={decrement}>
    //                 <span className="">DOWN</span>
    //             </button>
    //
    //         </div>
    //     </div>
    //-----------------------------------------------------------------------------------------------------------------

// --------------------------------------------COUNTER PROGRAM USING USEREDUCER----------------------------------------

    //using these properties in the reducer function instead of hardcoding strings into the switch case
    // const ACTIONS = {
    //     INCREMENT: 'increment',
    //     DECREMENT: 'decrement'
    // }
    //
    // // reducer function takes 2 pars: current state, and an action, which is what we pass into the dispatch function
    //     // the reducer is going to return our current state
    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case ACTIONS.INCREMENT:
    //             return { count: state.count + 1 }
    //         case ACTIONS.DECREMENT:
    //             return { count: state.count - 1}
    //         // this just returns the state we already have
    //         default:
    //             return state;
    //     }
    // }
    //
    // // with reducer, you can also use just 0 for instead of the count object, but most time you will see using object
    //     // state is actually count
    // // reducer is a funcion ^^ up there
    // // dispatch is a function is what we call to update reducer in order to update state given certain parameters
    // const [state, dispatch] = useReducer(reducer, { count: 0});
    //
    // const increment = () => {
    //     // Passing a type into dispatch lets you do more than just increment.
    //         // dispatch calls the reducer function then based on what type is passed, is what the state changes to
    //     dispatch({ type: 'increment'})
    // }
    //
    // const decrement = () => {
    //     dispatch({ type: 'decrement' })
    // }
    //
    // return (
    //
    //     <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center mt-8 border-2 border-solid border-blue-700">
    //         <div className="flex justify-center">
    //                 <span className="mt-2 text-4xl flex justify-center text-red-700">
    //                     {state.count}
    //                 </span>
    //         </div>
    //         <div className="flex justify-center space-x-2 mt-2 mb-2">
    //             <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={increment}>
    //                 <span className="flex-1">UP</span>
    //             </button>
    //             <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={decrement}>
    //                 <span className="">DOWN</span>
    //             </button>
    //
    //         </div>
    //     </div>
    //
    //
    // );
    //-----------------------------------------------------------------------------------------------------------------

    // --------------------------------------------TO-DO PROGRAM USING USEREDUCER--------------------------------------
    const reducer = (todos, action) => {
        switch (action.type) {
            // check if todos
            case ACTIONS.ADD_TODO:
                return [...todos, newTodo(action.payload.name)]
            case ACTIONS.TOGGLE_TODO:
                // take all current todos and map over them to get a new list of "todos" and take current "todo" and set
                // to complete or uncomplete depending on what it currently is
                return todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        //spreads out all todos into a new object then set complete "todo".complete which is opposite of
                        // "todo".complete changing from true to false to false to true
                        return { ...todo, complete: !todo.complete }
                    }
                    // if not then just return to-do because we dont want to touch it
                    return todo;
                })
            case ACTIONS.DELETE_TODO:
                // if to-do.id is not equal to payload.id, we keep it, otherwise we delete it
                return todos.filter(todo => todo.id !== action.payload.id)
            default:
                return todos;
        }
    }

    const newTodo = (name) => {
        return { id: Date.now(), name: name, complete: false}
    }

    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        // vv this prevents the page from refreshing
        e.preventDefault();
        // vv this type variable is passed into to dispatch which is essentially what we are going to do
            // this pass in paramater "payload". THESE are the paramaters of the ACTION we are performing
            // dispatch takes on different paramaters and actions for what you actually want to use. so instead of having
            // a bunch of different call backs for adding todos, editing, etc, we just ahve one single function (dispatch)
            // that takes in paramaters and actions for what you want to do.
        dispatch({ type: ACTIONS.ADD_TODO,  payload: { name:  name }})
        setName('');
    }

    console.log(todos);
    return (
        <>
            <form className="flex justify-center mt-8" onSubmit={handleSubmit}>
                <input className="border-solid border-black border-2" type="text" value={name} onChange={e => setName(e.target.value)} />
            </form>
            {todos.map(todo => {
                return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
            })}
        </>
    )
}

export default App;
