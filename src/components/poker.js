import {useEffect, useRef} from "react";
import image2 from "../img/solitaire-bitmap.png"

const cardSheet = new Image();
cardSheet.src = "../img/solitaire-bitmap.png";

// TODO: Add a background and size
// Add the concept of a deck and dealing a hand
// Add a dealer
// Add buttons for actions
// Add 
// resize cards as needed
// Detect click of cards
// 
const drawCard = (canvas, index, x, y) => {
    const context = canvas.current.getContext('2d');
    const img = new Image();
    img.src = image2;
    img.onload = () => {
        console.log("drawing image");
        context.drawImage(img, (index % 13) * 71, Math.floor(index / 13) * 96, 71, 96, x, y, 71, 96);
    }
}

const Poker = () => {
    const myCanvas = useRef(null);
    console.log("poker");

    useEffect(()=> {
        drawCard(myCanvas, 0, 10, 10);
        drawCard(myCanvas, 0, 24, 10);
    }, []);

    return (
        <>
        <canvas 
            ref={myCanvas}
            height={200}
            width={200}/>
        </>
    )
}

export default Poker;