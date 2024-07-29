interface DrawLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function DrawLine(props: DrawLineProps) {
    const length = Math.sqrt((props.x2 - props.x1) ** 2 + (props.y2 - props.y1) ** 2);
    const angle = Math.atan2(props.y2 - props.y1, props.x2 - props.x1) * (180 / Math.PI);

    return (
        <div
            style={{
                position: 'relative',
                transformOrigin: '0 0',
                transform: `translate(40px, 40px) rotate(${angle}deg)`,
                width: `${length}px`,
                height: '2px',
                backgroundColor: 'var(--overlay-color)',
                zIndex: -1
            }}
        />
    );
}

export default DrawLine;