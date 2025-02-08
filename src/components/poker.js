import {useEffect, useRef} from "react";
import image2 from "../img/solitaire-bitmap.png"

const cardSheet = new Image();
cardSheet.src = "../img/solitaire-bitmap.png";

// TODO: size
// Add the concept of a deck and dealing a hand
// Add a dealer
// Add buttons for actions
// Add Add a background and 
// resize cards as needed
// Detect click of cards
// Add an interaction / commands section
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