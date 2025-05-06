import { useState } from "react";
import { checkForDirectionalWin, createEmptyBoard } from "../utils/gameLogic";
import type { Piece } from "../types/gameTypes";
import { BLUE, EMPTY, RED, ROWS } from "../constants/game";
import { FieldButton } from "./FieldButton";

export const GameBoard = () => {
    const [isRedTurn, setIsRedTurn] = useState(true);
    const [board, setBoard] = useState<Piece[][]>(createEmptyBoard());

    const resetGame = () => {
        setBoard(createEmptyBoard());
        setIsRedTurn(true);
    };

    const handleCellClick = (column: number) => {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][column] === EMPTY) {
                const newBoard = board.map((r) => [...r]);
                newBoard[row][column] = isRedTurn ? RED : BLUE;

                setBoard(newBoard);
                if (checkWin(newBoard, row, column)) {
                    setTimeout(() => {
                        alert(`${isRedTurn ? "Red" : "Blue"} wins!`);
                        resetGame();
                    }, 1);
                } else {
                    setIsRedTurn(!isRedTurn);
                }

                break;
            }
        }
    };

    const checkWin = (b: Piece[][], r: number, c: number) => {
        return (
            checkForDirectionalWin(b, isRedTurn, r, c, (r, c) => [
                [r, c + 1],
                [r, c - 1],
            ]) >= 4 ||
            checkForDirectionalWin(b, isRedTurn, r, c, (r, c) => [
                [r + 1, c],
                [r - 1, c],
            ]) >= 4 ||
            checkForDirectionalWin(b, isRedTurn, r, c, (r, c) => [
                [r + 1, c + 1],
                [r - 1, c - 1],
            ]) >= 4 ||
            checkForDirectionalWin(b, isRedTurn, r, c, (r, c) => [
                [r - 1, c + 1],
                [r + 1, c - 1],
            ]) >= 4
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
            <h1 className="text-2xl font-bold mb-8 text-white">Connect Four</h1>
            <div>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, colIndex) => (
                            <FieldButton
                                key={`${rowIndex}-${colIndex}`}
                                value={cell}
                                onClick={() => handleCellClick(colIndex)}
                                disabled={cell !== EMPTY}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
