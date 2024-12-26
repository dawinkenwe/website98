import { useEffect, useRef, useState } from "react"

const tickTime = 1000 / 60;

const procressTick = () => {
    return true;
};

// input gather
// update positions
// collision check

// we likely only want to have the canvas element update.
// it could update per tick??

const RECTANBLE_SIZE = [150, 100];
const PLAYER_RECTANGLE_SIZE =  [50, 50]
const GRAVITY = 30;

const HelicopterGame = () => {
    const [isTicking, setIsTicking] = useState(false);
    const [tickCount, setTickCount] = useState(0);
    const [keyPressed, setKeyPressed] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [running, setRunning] = useState(false);
    const [velocity, setVelocity] = useState()

    const canvasRef = useRef(null);

    // Maybe, window -> input handler -> canvas

    // Test write to canvas. Maybe use to write to 
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.font = "30px Arial";
        context.fillText("Hello World!", 10, 50)
    })

    // Add the input handler

    const downHandler = ({key}) => {
        if (key === ' ') {
            setKeyPressed(true);
            if (!isTicking) setIsTicking(true);
        }
    }

    const upHandler = ({key}) => {
        if (key === ' ') {
            setKeyPressed(false);
        }
    }

    const newGame = () => {
        setTickCount(0);
        setIsTicking(true);
    }

    const endGame = () => {
        setIsTicking(false);
    }

    const handleMouseDown = () => {
        setMouseDown(true);
        if (!isTicking) setIsTicking(true);
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        }
    })

    const updateState = () => {
        const collision = false;
        if (collision) {
            endGame();
        }
    }

    const updateCanvas = () => {
        if (!isTicking) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
    
            context.font = "30px Arial";
            context.fillText("Hello World!", 10, 50)
        }
    }

    // Each render is a tick. But we only want to do constant re-renders if the game is in the running state.
    useEffect(() => {
        if (!isTicking) return
        const interval = setInterval(() => {setTickCount(tickCount + 1)}, tickTime);

        updateState();
        updateCanvas()

        return () => clearInterval(interval)
    }, [isTicking, tickCount])

    return (
        <div className="helicopterGame">
            <canvas id="myCanvas" width="250" height="300"
                style="border:1px solid #d3d3d3;" ref={canvasRef} onMouseDown={handleMouseDown} onMouseUp={() => {setMouseDown(false)}}>
                Your browser does not support the HTML canvas tag.
            </canvas>
        </div>
    );
};

export default HelicopterGame