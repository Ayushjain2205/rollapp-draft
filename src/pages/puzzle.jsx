import { useState, useEffect, useCallback } from "react";
import Page from "../components/Layout/Page";

export default function Puzzle() {
  // Function to generate a 10x10 grid with random letters
  const generateGrid = () => {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );
  };

  // State for the grid, selected cells, and the current word
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);

  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  // Function to build the word from selected cells
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

  // Function to handle start of selection
  const handleSelectionStart = (rowIndex, cellIndex) => {
    setIsDragging(true);
    setStartCell({ rowIndex, cellIndex });
    const newSelectedCells = [`${rowIndex}-${cellIndex}`];
    setSelectedCells(newSelectedCells);
    setCurrentWord(buildWord(newSelectedCells));
  };

  // Determine if the current cell is in line with the start cell
  const isInLine = (start, current) => {
    const dx = Math.abs(start.rowIndex - current.rowIndex);
    const dy = Math.abs(start.cellIndex - current.cellIndex);
    return dx === 0 || dy === 0 || dx === dy;
  };

  // Function to handle selection change (mouse move or touch move)
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

  // Function to handle end of selection
  const handleSelectionEnd = useCallback(() => {
    setIsDragging(false);
    setStartCell(null);
    console.log("Selected Word:", currentWord);
  }, [currentWord]);

  // Function to get row and column index from touch event
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
    <Page>
      <div className="flex flex-col w-full justify-center items-center bg-gray-100">
        <div className="grid grid-cols-8 p-4 bg-white shadow-lg rounded">
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                data-row={rowIndex}
                data-cell={cellIndex}
                className={`w-10 h-10 bg-gray-200 flex justify-center items-center cursor-pointer select-none ${
                  selectedCells.includes(`${rowIndex}-${cellIndex}`)
                    ? "bg-[#00FF00]"
                    : ""
                }`}
                onMouseDown={() => handleSelectionStart(rowIndex, cellIndex)}
                onMouseEnter={() => handleSelectionChange(rowIndex, cellIndex)}
                onMouseUp={handleSelectionEnd}
                onTouchStart={(e) => {
                  const position = getTouchPosition(e);
                  if (position) {
                    handleSelectionStart(position.rowIndex, position.cellIndex);
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
            ))
          )}
        </div>
        <div className="mt-4 text-lg">Selected Word: {currentWord}</div>
      </div>
    </Page>
  );
}
