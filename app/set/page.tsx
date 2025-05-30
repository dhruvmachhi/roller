'use client';

import { useState } from 'react';

export default function RiggerPage() {
  const [result, setResult] = useState<string | number>('');

  async function handleClick(number: number) {
    try {
      const res = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.number);
      } else {
        setResult(data.error || 'Failed to store number');
      }
    } catch (error) {
      setResult('Network error');
    }
  }

  return (
    <div className="h-[100dvh] w-screen flex flex-col">
      {/* Top Row */}
      <div className="flex flex-1">
        <button
          onClick={() => handleClick(1)}
          className="flex-1 bg-blue-100 text-white text-4xl font-bold p-4"
        >
          1
        </button>
        <button
          onClick={() => handleClick(2)}
          className="flex-1 bg-red-100 text-white text-4xl font-bold p-4"
        >
          2
        </button>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-1">
        <button
          onClick={() => handleClick(3)}
          className="flex-1 bg-green-100 text-white text-4xl font-bold p-4"
        >
          3
        </button>
        <button
          onClick={() => handleClick(4)}
          className="flex-1 bg-yellow-100 text-white text-4xl font-bold p-4"
        >
          4
        </button>
      </div>

      {/* Bottom Full-Width Button */}
      <button
        onClick={() => handleClick(5)}
        className="bg-purple-100 text-white text-4xl font-bold p-6 w-full"
      >
        5
      </button>

      {/* Result display (optional) */}
      <div className="absolute bottom-2 right-4 text-white text-xl">
        Selected: {result}
      </div>
    </div>
  );
}