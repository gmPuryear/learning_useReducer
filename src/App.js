import './App.css';
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0);

    const increment = () => {
        // this VV arrow function automatically returns prevCount => prevCount + 1
        setCount(prevCount => prevCount + 1);
    }

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    }

    return (

        <div className="flex flex-col justify-center h-screen ">
            <div className="flex justify-center">
                    <span className="flex justify-center border-2 border-solid border-blue-700 text-red-700">
                        {count}
                    </span>
            </div>
            <button onClick={decrement}>
                UP
            </button>
        </div>


    );
}

export default App;
