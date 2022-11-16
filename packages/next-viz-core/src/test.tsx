import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={notify}>Notify !</button>
      </div>
      <Toaster />
    </>
  );
};

export default App;
