import { BLUE, COLUMNS, EMPTY, RED, ROWS } from "../constants/game";
import type { Piece } from "../types/gameTypes";

export function createEmptyBoard(): Piece[][] {
    return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(EMPTY));
}

export function checkForDirectionalWin(
    board: Piece[][],
    isRedTurn: boolean,
    row: number,
    col: number,
    getDirections: (
        r: number,
        c: number
    ) => [[number, number], [number, number]],
    seen: Set<string> = new Set()
): number {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLUMNS) return 0;
    if (seen.has(`${row}-${col}`)) return 0;

    const color = isRedTurn ? RED : BLUE;
    if (board[row][col] !== color) return 0;

    seen.add(`${row}-${col}`);
    const [dir1, dir2] = getDirections(row, col);

    return (
        1 +
        checkForDirectionalWin(
            board,
            isRedTurn,
            dir1[0],
            dir1[1],
            getDirections,
            seen
        ) +
        checkForDirectionalWin(
            board,
            isRedTurn,
            dir2[0],
            dir2[1],
            getDirections,
            seen
        )
    );
}
