import React, { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
  );
}
