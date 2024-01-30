import { useState, useEffect, useCallback } from "react";
import Page from "../components/Layout/Page";

export default function Puzzle() {
  const wordToFind = "DONALD";

  const generateGrid = () => {
    let newGrid = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );

    const startRow = Math.floor(Math.random() * 8);
    const startCol = Math.floor(Math.random() * (8 - wordToFind.length));
    for (let i = 0; i < wordToFind.length; i++) {
      newGrid[startRow][startCol + i] = wordToFind.charAt(i);
    }

    return newGrid;
  };

  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [wordStatus, setWordStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);

  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  const buildWord = useCallback(
    (selectedCells) => {
      return selectedCells
        .map((cellKey) => {
          const [row, col] = cellKey.split("-").map(Number);
          return grid[row][col];
        })
        .join("");
    },
    [grid]
  );

  const handleSelectionStart = (rowIndex, cellIndex) => {
    setIsDragging(true);
    setStartCell({ rowIndex, cellIndex });
    const newSelectedCells = [`${rowIndex}-${cellIndex}`];
    setSelectedCells(newSelectedCells);
    setCurrentWord(buildWord(newSelectedCells));
  };

  const isInLine = (start, current) => {
    const dx = Math.abs(start.rowIndex - current.rowIndex);
    const dy = Math.abs(start.cellIndex - current.cellIndex);
    return dx === 0 || dy === 0 || dx === dy;
  };

  const handleSelectionChange = (rowIndex, cellIndex) => {
    if (isDragging && startCell) {
      const currentCell = { rowIndex, cellIndex };
      if (isInLine(startCell, currentCell)) {
        const newSelectedCells = [];
        const rowIncrement = Math.sign(rowIndex - startCell.rowIndex);
        const colIncrement = Math.sign(cellIndex - startCell.cellIndex);
        let currentRow = startCell.rowIndex;
        let currentCol = startCell.cellIndex;

        while (
          currentRow !== rowIndex + rowIncrement ||
          currentCol !== cellIndex + colIncrement
        ) {
          newSelectedCells.push(`${currentRow}-${currentCol}`);
          currentRow += rowIncrement;
          currentCol += colIncrement;
        }

        setSelectedCells(newSelectedCells);
        setCurrentWord(buildWord(newSelectedCells));
      }
    }
  };

  const handleSelectionEnd = useCallback(() => {
    setIsDragging(false);
    setStartCell(null);
    if (currentWord === wordToFind) {
      setWordStatus("correct");
    } else {
      setWordStatus("incorrect");
      setTimeout(() => {
        setSelectedCells([]);
        setWordStatus(null);
      }, 1000);
    }
  }, [currentWord, wordToFind]);

  const getTouchPosition = (event) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    return element && element.dataset
      ? {
          rowIndex: parseInt(element.dataset.row),
          cellIndex: parseInt(element.dataset.cell),
        }
      : null;
  };

  return (
    <Page pageColor="#FFC022" back="/hunts">
      <div className="flex flex-col w-full justify-center items-center ">
        <p className="w-full text-[24px]">Who is Mickey Mouse’s bestfriend?</p>
        <div className="grid grid-cols-8 p-4 rounded">
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
              const isSelected = selectedCells.includes(
                `${rowIndex}-${cellIndex}`
              );
              let bgColor = "bg-gray-200";
              if (isSelected) {
                bgColor = "bg-blue-500";
                if (!isDragging) {
                  bgColor =
                    currentWord === wordToFind ? "bg-green-500" : "bg-red-500";
                }
              }
              return (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  data-row={rowIndex}
                  data-cell={cellIndex}
                  className={`w-10 h-10 ${bgColor} flex justify-center items-center cursor-pointer select-none`}
                  onMouseDown={() => handleSelectionStart(rowIndex, cellIndex)}
                  onMouseEnter={() =>
                    handleSelectionChange(rowIndex, cellIndex)
                  }
                  onMouseUp={handleSelectionEnd}
                  onTouchStart={(e) => {
                    const position = getTouchPosition(e);
                    if (position) {
                      handleSelectionStart(
                        position.rowIndex,
                        position.cellIndex
                      );
                    }
                  }}
                  onTouchMove={(e) => {
                    const position = getTouchPosition(e);
                    if (position) {
                      handleSelectionChange(
                        position.rowIndex,
                        position.cellIndex
                      );
                    }
                  }}
                  onTouchEnd={handleSelectionEnd}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
        <div className="mt-2 text-lg">
          {currentWord}{" "}
          {wordStatus === "correct" ? (
            <span className="text-green-500">✅</span>
          ) : wordStatus === "incorrect" ? (
            <span className="text-red-500">❌</span>
          ) : null}
        </div>
        {wordStatus === "correct" && (
          <div className="mt-4">
            <button className="flex flex-row items-center gap-[8px] text-white bg-[#262626] h-[40px] w-[160px] rounded-[8px] font-[500] justify-center">
              Claim
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M1.37556 7.59375L10.5178 7.59375L5.04588 12.3438C4.95838 12.4203 5.0115 12.5625 5.12713 12.5625L6.50994 12.5625C6.57088 12.5625 6.62869 12.5406 6.674 12.5016L12.5787 7.37812C12.6328 7.33125 12.6761 7.27329 12.7059 7.20819C12.7356 7.14308 12.751 7.07235 12.751 7.00078C12.751 6.92921 12.7356 6.85848 12.7059 6.79337C12.6761 6.72827 12.6328 6.67031 12.5787 6.62344L6.63963 1.46875C6.61619 1.44844 6.58806 1.4375 6.55838 1.4375L5.12869 1.4375C5.01306 1.4375 4.95994 1.58125 5.04744 1.65625L10.5178 6.40625L1.37556 6.40625C1.30681 6.40625 1.25056 6.4625 1.25056 6.53125L1.25056 7.46875C1.25056 7.5375 1.30681 7.59375 1.37556 7.59375Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Page>
  );
}
