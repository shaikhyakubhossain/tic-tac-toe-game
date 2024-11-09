"use client";
import { useState, useEffect, useRef } from "react";
import InputX from "@/components/InputX/input-x.component";
import InputO from "@/components/InputO/input-o.component";

import styles from "./grid.module.scss";

type matrixType = {
  id: number;
  active: number;
};

export default function Grid() {
  const [matrix, setMatrix] = useState<matrixType[]>([
    { id: 1, active: -1 },
    { id: 2, active: -1 },
    { id: 3, active: -1 },
    { id: 4, active: -1 },
    { id: 5, active: -1 },
    { id: 6, active: -1 },
    { id: 7, active: -1 },
    { id: 8, active: -1 },
    { id: 9, active: -1 },
  ]);
  const [player1Input] = useState<number>(Math.random() > 0.5 ? 1 : 0);
  const [aiInput] = useState<number>(player1Input === 1 ? 0 : 1);
  const [userTurnCount, setUserTurnCount] = useState<number>(0);

  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const gridBlockTW: string = `flex items-center justify-center w-[88px] h-[88px] rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer`;

  const easyAI = () => {
    const aiChoiceArr = [];

    for (let i = 0; i < matrix.length; i++) {
      if(matrix[i].active === -1) {
        aiChoiceArr.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * aiChoiceArr.length)
    const aiChoice = aiChoiceArr[randomIndex];
    // console.log("randomIndex: ", randomIndex);
    setMatrix((prev) => {
      const newMatrix = [...prev];
      newMatrix[aiChoice] = { id: 1, active: aiInput };
      return newMatrix;
    });
    checkWin("horizontal");
    checkWin("vertical");
    checkWin("diagonal");
  };

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const id = parseInt(event.target.id);
      setMatrix((prev) => {
        const newMatrix = [...prev];
        newMatrix[id - 1] = { id: 1, active: player1Input };
        return newMatrix;
      });
      setUserTurnCount((prev) => prev + 1);
    }
    checkWin("horizontal");
    checkWin("vertical");
    checkWin("diagonal");
  };
  
  const checkWin = (checkType: string) => {
    let nextIndex: number = 0;
    let compareWith: number = 0;
    let matched: boolean = false;

    if(checkType === "diagonal") {
      nextIndex = Math.sqrt(matrix.length) - 2;
      compareWith = Math.sqrt(matrix.length) + 1;
    }
    else if(checkType === "horizontal") {
      nextIndex = Math.sqrt(matrix.length);
      compareWith = 1
    }
    else if(checkType === "vertical") {
      nextIndex = 1;
      compareWith = Math.sqrt(matrix.length);
    }

    for(let i = 0; i < Math.sqrt(matrix.length) - 1; i += nextIndex) {
      for(let j = 1; j < Math.sqrt(matrix.length); j++){
        if(checkType === "diagonal") {
          console.log(nextIndex);
        }
        if(matrix[i].active === -1){
          break;
        }
        // if(checkType === "diagonal" && i !== 0 && matrix[i].active === matrix[(i + 1) + (Math.sqrt(matrix.length) - 1)].active) {
        //   matched = true;
        //   console.log("hiii");
        // }
        else if(matrix[i].active ===  matrix[i + (compareWith * j)].active) {
          matched = true;
        }
        else {
          matched = false;
        }
      }
  }
  if(matched) {
    alert('you win');
  }
  }

  useEffect(() => {
    if (userTurnCount === 5) {
      alert("Game Over");
    }
    if(userTurnCount !== 0) {
      easyAI();
    }
  }, [userTurnCount]);

  return (
    <div ref={gridContainerRef} className={`${styles.mainContainer} mx-auto grid gap-2`}>
      {matrix.map((item, index) => {
        return (
          <div
            key={index}
            id={(index + 1).toString()}
            className={`${gridBlockTW}`}
            onClick={handleClick}
          >
            {item.active === 0 ? <InputO /> : item.active === 1 ? <InputX /> : null}
          </div>
        );
      })}
    </div>
  );
}
