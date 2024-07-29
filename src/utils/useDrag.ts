import {useRef, useState} from "react";

export const useDrag = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const dragStartRef = useRef<{ x: number, y: number } | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        dragStartRef.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y
        };
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (dragging && dragStartRef.current) {
            setPosition({
                x: event.clientX - dragStartRef.current.x,
                y: event.clientY - dragStartRef.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        dragStartRef.current = null;
    };

    return {
        position,
        dragging,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    }
}