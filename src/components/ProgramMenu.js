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
    const [selectedOption, setSelectedOption] = useState(undefined);
    const props = testMenu;
    const handleClick = (option) => {
        selectedOption === option ? setSelectedOption(undefined) : setSelectedOption(option)
    }
    const handleHover = (option) => {
        if (selectedOption) setSelectedOption(option);
    }

    // TODO: add styling to make the suboptions display underneath the option
    // then make it so that it only happens WHEN the option is hovered over
    // then make it so that they don't push the bar they're on down.
    // I think we could do this by making the parent container not a flex???
    return (
        <>
            <ul className="menu-bar" style={{ margin: 0 }} >
                <div className="menuBarLine"/>
            {props.map((option) => {
                return (
                    <>
                        <li className="menuItem textUnderline" onClick={() => { handleClick(option) }} onMouseEnter={() => {handleHover(option) } }><span>{option.text}</span>
                            {selectedOption === option &&
                                <ul className="optionsDropDown">
                                    {selectedOption.subOptions.map((subOption) => {
                                        return (<li className="dropDownItem"><span>{subOption.text}</span></li>)
                                    })}
                                </ul>
                            }
                        </li>                        
                    </>
                )
        })}
        </ul>

        </>
    )
}

export default ProgramMenu