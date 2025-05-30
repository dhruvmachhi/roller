"use client";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client"

export default function Home() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(0);
  const [offset, setOffset] = useState(0);

  function roll() {
    setRolling(true);
  }async function fetchNumber() {
      try {
        const res = await fetch('/api/');
        const data = await res.json();
        if (res.ok) {
          setOffset(4-data.number);
        } else {
          setOffset(0);
        }
      } catch (err) {
        setOffset(0);
      }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (rolling) {
      intervalId = setInterval(() => {
        setOffset((prev) => (prev + 1) % 5);
      }, 200);

      setTimeout(() => {
        clearInterval(intervalId);
        fetchNumber(); setRolling(false);
    }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [rolling]);

  return (
    <main className="flex items-center flex-col p-5 gap-3">
      <p className="text-3xl font-bold">Number Roller</p>
      <div className="flex justify-center" id="roller-container">
        <ul id="roller" className={"text-2xl " + (rolling ? "rolling" : "")}>
          <li>{((offset + 0) % 5) + 1}</li>
          <li>{((offset + 1) % 5) + 1}</li>
          <li className={rolling ? "" : "bg-red-300"}>{((offset + 2) % 5) + 1}</li>
          <li>{((offset + 3) % 5) + 1}</li>
          <li>{((offset + 4) % 5) + 1}</li>

        </ul>
      </div>
      <motion.button onClick={roll} whileHover={{ scale: rolling ? 1 : 1.1 }} whileTap={{ scale: rolling ? 1 : 0.9 }} className={"text-2xl px-4 py-2 rounded-xl " + (rolling ? "bg-gray-100 hover:cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500 hover:cursor-pointer")}>Roll</motion.button>
    </main>
  );
}
