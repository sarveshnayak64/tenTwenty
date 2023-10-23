import { useRef, useState } from "react";

const CustomMouseCursor = ({ children, cursorSize = 20 }) => {
    const [cursorPosition, setCursorPosition] = useState({ top: "50%", left: "50%" })
    const [isHovered, setIsHovered] = useState(false);
    const parentDivRef = useRef(null);

    //Handle mouse cursor
    const onMouseMove = e => {
        if (parentDivRef.current) {
            const rect = parentDivRef.current.getBoundingClientRect();
            // Calculate the adjusted cursor position
            const adjustedTop = Math.max(0, Math.min(e.clientY - rect.top - cursorSize, rect.height - cursorSize));
            const adjustedLeft = Math.max(0, Math.min(e.clientX - rect.left - cursorSize, rect.width - cursorSize));

            setCursorPosition({
                top: `${adjustedTop}px`,
                left: `${adjustedLeft}px`,
            });
        }
    }

    return <div
        className="relative cursor-none"
        ref={parentDivRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >
        <div className={`${isHovered ? 'backdrop-invert text-white' : 'bg-white'} shadow-2xl cursor-none h-${cursorSize} w-${cursorSize} rounded-full z-40 hover:backdrop-invert hover:bg-transparent flex justify-center items-center pointer-events-none`} style={{ position: 'absolute', ...cursorPosition }} >
            Drag
        </div>
        {children}
    </div>
};

export default CustomMouseCursor;
