import {useEffect, useRef, useState} from "react";
import image2 from "../img/solitaire-bitmap.png";
import "./poker.css";
import { InfoGrid, RunInfoOptions, RoundScoreGrid, BlindInfoGrid } from './pokerMenuComponents';

const cardSheet = new Image();
cardSheet.src = "../img/solitaire-bitmap.png";

// TODO: size
// styling of content
// Add the concept of a deck and dealing a hand
// Add a dealer
// Add buttons for actions
// resize cards as needed
// Detect click of cards
// Add a discard pile for reshuffling
// Test multiple decks
// Add a menu bar that is the same size as 
// Switch column to flex, flex column, set individual sections to be size based?
// We're moving away from using the canvas approach. that feels silly.
// instead we're going to use pure react components. we'll pring from the sheet
// This might actually make it easier.
// 1. Switch to cards from React
// 2. Fix the styling on the sidebar - iinclude inverse box shadow.
// 3. background green, rather than canvas
// 4. flex

const Card = (index) => {
    const cardName="Ace of Spades"
    let x = (index % 13) * 71
    let y = Math.floor(index / 13) * 96

    const style = {width: 71, height: 96, objectPosition: `-${x}px -${y}px`, objectFit: "None"}

    return (
        <div>
            <img src={image2} alt={cardName} style={style}></img>
        </div>
    )
}

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
        <div className="poker" style={{ display: "flex", flexDirection: "row", backgroundColor: "#006300", width: "100%" }}>
            <div className="controlsDiv" style={{ flex: 1, backgroundColor: "#b9b9b9", marginLeft: "20px" }}>
                <BlindInfoGrid blindType={'big'} targetScore={"20,000"} />
                <RoundScoreGrid totalScore={"7,520"} computedScore={"80"} chips={40} multiplyer={2} />
                <InfoGrid hands={3} discards={5} money={100} ante={1} rounds={1} />
                <RunInfoOptions />
            </div>
            <div className="canvasDiv" style={{flex: 2, backgroundColor: "#006300"}}>
                <canvas 
                ref={myCanvas}
                height={200}
                width={200}/>
            </div>
            <Card index={0}/>
        </div>
    )
}

export default Poker;