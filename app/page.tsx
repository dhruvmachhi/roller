"use client";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client"
import { useAnimationControls } from "motion/react";


export default function Home() {
  const [rolling, setRolling] = useState(false);
  const [offset, setOffset] = useState(0);
  const [fresult, setResult] = useState(0);
  const controls = useAnimationControls();

  function roll() {
    setRolling(true);
    controls.start("popped");
  }

  async function fetchNumber() {
      try {
        const res = await fetch('/api/');
        const data = await res.json();
        if (res.ok) {
          setResult(data.number);
        }
      } catch (err) {
        alert(err)
      }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (rolling) {
      intervalId = setInterval(() => {
        setOffset((prev) => ((prev + 1) % 5 + 1));
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        setRolling(false);
      }, 3000);

      setTimeout(async () => {
        await fetchNumber();
      }, 2500);
    }
    return () => clearInterval(intervalId);
  }, [rolling]);

  const result = {
    normal: {
      scale: 1.0
    },
    popped: {
      scale: 1.0
    },
    exit: {
      scale: 1.0
    }
  }

  return (
    <main className="flex items-center flex-col p-5 gap-3">
      <p className="text-3xl font-bold">Number Roller</p>
      <div className="flex justify-center" id="roller-container">
        <ul id="roller" className={"text-[10rem] " + (rolling ? "rolling" : "text-red-400")}>
          <motion.div initial="normal" animate={controls} variants={result}>{rolling == false ? fresult : offset}</motion.div>
        </ul>
      </div>
      <motion.button onClick={roll} whileHover={{ scale: rolling ? 1 : 1.1 }} whileTap={{ scale: rolling ? 1 : 0.9, y:-20 }} className={"text-2xl px-4 py-2 rounded-xl mt-4 " + (rolling ? "bg-gray-100 hover:cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500 hover:cursor-pointer")}>Roll</motion.button>
    </main>
  );
}
