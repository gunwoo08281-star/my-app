"use client";

import { useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);
    return (
      <button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         onClick={() => setCount((c) => c + 1)}
       >
         카운터 - {count}
     </button>
    );
}