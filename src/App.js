import './App.css';
import {useReducer, useState} from "react";

// useReducer allows you to handle more COMPLEX state so we are going to change this counter to use the useReducer hook
// INSTEAD of useState
// useReducer is better for more complex cases that use nested components that you have to pass props down into
// **LOOK AT TO-DO LIST BELOW TO SEE IT IN ACTION

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
    // -----------------------------------------------------------------------------------------------------------------

// --------------------------------------------PROGRAM USING USEREDUCER--------------------------------------------------

    //using these properties in the reducer function instead of hardcoding strings into the switch case
    const ACTIONS = {
        INCREMENT: 'increment',
        DECREMENT: 'decrement'
    }

    // reducer function takes 2 pars: current state, and an action, which is what we pass into the dispatch function
        // the reducer is going to return our current state
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.INCREMENT:
                return { count: state.count + 1 }
            case ACTIONS.DECREMENT:
                return { count: state.count - 1}
            // this just returns the state we already have
            default:
                return state;
        }
    }

    // with reducer, you can also use just 0 for instead of the count object, but most time you will see using object
        // state is actually count
    // reducer is a funcion ^^ up there
    // dispatch is a function is what we call to update reducer in order to update state given certain parameters
    const [state, dispatch] = useReducer(reducer, { count: 0});

    const increment = () => {
        // Passing a type into dispatch lets you do more than just increment.
            // dispatch calls the reducer function then based on what type is passed, is what the state changes to
        dispatch({ type: 'increment'})
    }

    const decrement = () => {
        dispatch({ type: 'decrement' })
    }

    return (

        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center mt-8 border-2 border-solid border-blue-700">
            <div className="flex justify-center">
                    <span className="mt-2 text-4xl flex justify-center text-red-700">
                        {state.count}
                    </span>
            </div>
            <div className="flex justify-center space-x-2 mt-2 mb-2">
                <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={increment}>
                    <span className="flex-1">UP</span>
                </button>
                <button className="border-2 border-solid border-blue-700 text-red-700 w-1/4" onClick={decrement}>
                    <span className="">DOWN</span>
                </button>

            </div>
        </div>


    );
}

export default App;
