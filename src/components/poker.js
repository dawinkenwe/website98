import {useEffect, useRef, useState} from "react";
import image2 from "../img/solitaire-bitmap.png"

const cardSheet = new Image();
cardSheet.src = "../img/solitaire-bitmap.png";

// TODO: size
// Add the concept of a deck and dealing a hand
// Add a dealer
// Add buttons for actions
// resize cards as needed
// Detect click of cards
// Add a discard pile for reshuffling
// Test multiple decks
// Add a menu bar that is the same size as 
const drawCardToCanvas = (canvas, index, x, y) => {
    const context = canvas.current.getContext('2d');
    const img = new Image();
    img.src = image2;
    img.onload = () => {
        console.log("drawing image");
        context.drawImage(img, (index % 13) * 71, Math.floor(index / 13) * 96, 71, 96, x, y, 71, 96);
    }
}

const Poker = () => {
    // const deck = Array.from(Array(10).keys())

    const [deck, setDeck] = useState([])

    const reshuffleDeck = () => {
        setDeck([...Array(52).keys()])
    }

    const drawCardFromDeck = () => {
        if (deck.length === 0) {
            reshuffleDeck()
        }
        let index = Math.floor(Math.random() * deck.length)
        let cardNumber = deck.splice(index, 1)
        return cardNumber;
    }
    const myCanvas = useRef(null);
    console.log("poker");

    useEffect(()=> {
        let card1 = drawCardFromDeck();
        let card2 = drawCardFromDeck();
        console.log(card1);
        console.log(card2);
        drawCardToCanvas(myCanvas, card1, 10, 10);
        drawCardToCanvas(myCanvas, card2, 24, 10);
    }, [drawCardFromDeck]);

    return (
        <div className="poker" style={{display: "flex", flexDirection: "row", backgroundColor: "#006300", width: "100%"}}>
            <div className="controlsDiv" style={{flex: 1, backgroundColor: "#b9b9b9", marginLeft: "20px"}}>
                <div className="controlsColumn" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <div className="roundGoal windows-box-shadow" style={{display: "flex", flex: 1, boxSizing: "border-box", margin: "4px", alignItems: "center", justifyContent: "center"}}> Big Blind </div>
                    <div className="roundScore windows-box-shadow" style={{display: "flex", flex: 1, margin: "4px", alignItems: "center", justifyContent: "center"}}>Round Score</div>
                    <div className="moneyDiv windows-box-shadow" style={{display: "flex", flex: 1, margin: "4px", alignItems: "center", justifyContent: "center"}}>Money</div>
                    <div className="buttonsDiv windows-box-shadow" style={{display: "flex", flex: 1, margin: "4px", alignItems: "center", justifyContent: "center"}}><span style={{alignItems: "center", justifyContent: "center"}}>buttons</span></div>
                </div>
            </div>
            <div className="canvasDiv" style={{flex: "2", backgroundColor: "#006300"}}>
                <canvas 
                ref={myCanvas}
                height={200}
                width={200}/>
            </div>
        </div>
    )
}

export default Poker;