import { useEffect, useRef, useState } from "react"
import PongGame from "./PongGame"

const Pong = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const game = new PongGame(canvas);

        game.start();

        return () => {
            game.stop();
        };
    }, []);

    return (
        <canvas ref={canvasRef} width={800} height={600} />
    )
}

export default Pong;