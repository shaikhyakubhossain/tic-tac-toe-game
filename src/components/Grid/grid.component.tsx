"use client";
import { useState, useEffect } from "react";
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

  const gridBlockTW: string = `flex items-center justify-center w-20 h-20 bg-gray-300 border border-black`;

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
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
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
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    // console.log(matrix);
  };

  const checkHorizontalWin = () => {
    for(let i = 0; i < 9; i += 3) {
      console.log("horizontal", matrix[i].active, matrix[i + 1].active, matrix[i + 2].active);
      if(matrix[i].active === matrix[i + 1].active && matrix[i].active === matrix[i + 2].active && matrix[i].active !== -1) {
        alert(matrix[i].active === aiInput ? "AI Win" : "you Win");
      }
    }
  };

  const checkVerticalWin = () => {
    for(let i = 0; i < 3; i++) {
      console.log("vertical", matrix[i].active, matrix[i + 3].active, matrix[i + 6].active);
      if(matrix[i].active === matrix[i + 3].active && matrix[i].active === matrix[i + 6].active && matrix[i].active !== -1) {
        alert(matrix[i].active === aiInput ? "AI Win" : "you Win");
      }
    }
  };
  
  const checkDiagonalWin = () => {
    if(matrix[0].active === matrix[4].active && matrix[0].active === matrix[8].active && matrix[0].active !== -1) {
      alert(matrix[0].active === aiInput ? "AI Win" : "you Win");
    }
    else if(matrix[2].active === matrix[4].active && matrix[2].active === matrix[6].active && matrix[2].active !== -1) {
      alert(matrix[2].active === aiInput ? "AI Win" : "you Win");
    
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
    <div className={`${styles.mainContainer} w-60 mx-auto grid`}>
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
