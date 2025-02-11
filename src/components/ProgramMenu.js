import './ProgramMenu.css'
import { useState } from 'react';

const testMenu = [
    {text: "Game", subOptions: 
        [{text: "Sub1", function: () => {console.log("pressed sub1")}}, 
         {text: "Sub2", function: () => {console.log("pressed sub2")}},
         {text: "Sub3", function: () => {console.log("pressed sub3")}}
        ]
    },
    {text: "Help", subOptions:
        [{text: "Program Help", function: () => {console.log("pressed program help")}}]
    }
]


const ProgramMenu = () => {
    const [selectedOption, setSelectedOption] = useState("Game");
    const props = testMenu;

    // TODO: add styling to make the suboptions display underneath the option
    // then make it so that it only happens WHEN the option is hovered over
    // then make it so that they don't push the bar they're on down.
    // I think we could do this by making the parent container not a flex???
    return (
    <ul className="menu-bar">
        {props.map((option) => {
            console.log(option)
            return (
                <>
                    <li className="menuItem">{option.text}</li>
                    <ul>
                        {option.text === selectedOption && option.subOptions.map((subOption) => {
                            return <li className="subOption" onClick={subOption.function}>{subOption.text}</li>
                        })}
                    </ul>
                </>
            )
        })}
    </ul>)
}

export default ProgramMenu