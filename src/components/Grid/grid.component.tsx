"use client";
import { useState } from "react";
import InputX from "@/components/InputX/input-x.component";
import InputO from "@/components/InputO/input-o.component";

import styles from "./grid.module.scss";

type matrixType = {
  id: number;
  active: boolean;
};

export default function Grid() {
  const [matrix, setMatrix] = useState<matrixType[]>([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
    { id: 8, active: false },
    { id: 9, active: false },
  ]);
  const [yourInput] = useState<JSX.Element>(Math.random() > 0.5 ? InputX : InputO);

  const gridBlockTW: string = `flex items-center justify-center w-20 h-20 bg-gray-300 border border-black`;

  // const computersInput = yourInput === InputX ? InputO : InputX;

  // console.log(yourInput);

  // const setGrid = () => {
  //   for (let i = 0; i < matrix.length; i++) {
  //     for (let j = 0; j < matrix[i].length; j++) {
  //       if (matrix[i][j].active) {
  //         containerRef.current?.children[i];
  //       }
  //     }
  //   }
  // };

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const id = parseInt(event.target.id);
      setMatrix((prev) => {
        const newMatrix = [...prev];
        newMatrix[id - 1] = { id: 1, active: true };
        return newMatrix;
      });
    }

    console.log(matrix);
  };

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
            {item.active ? yourInput : null}
          </div>
        );
      })}
    </div>
  );
}
