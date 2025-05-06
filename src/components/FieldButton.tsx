import { BLUE, RED } from "../constants/game";
import type { Piece } from "../types/gameTypes";

interface FieldButtonProps {
    value: Piece;
    onClick: () => void;
    disabled: boolean;
}

export const FieldButton = ({ value, onClick, disabled }: FieldButtonProps) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className="w-10 h-10 border border-white"
    >
        {value === RED && (
            <div className="w-full h-full rounded-full bg-red-500" />
        )}
        {value === BLUE && (
            <div className="w-full h-full rounded-full bg-blue-500" />
        )}
    </button>
);
