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

// TODO: Make the chosen top level one look depressed

const ProgramMenu = () => {
    const [selectedOption, setSelectedOption] = useState(undefined);
    const props = testMenu;
    const handleClick = (option) => {
        selectedOption === option ? setSelectedOption(undefined) : setSelectedOption(option)
    }
    const handleHover = (option) => {
        if (selectedOption) setSelectedOption(option);
    }

    return (
        <>
            <ul className="menu-bar" style={{ margin: 0 }} >
                <div className="menuBarLine"/>
            {props.map((option) => {
                return (
                    <>
                        <li className="menuItem textUnderline" onClick={() => { handleClick(option) }} onMouseEnter={() => {handleHover(option) } }><span>{option.text}</span>
                            {selectedOption === option &&
                                <ul className="optionsDropDown windows-box-shadow">
                                    {selectedOption.subOptions.map((subOption) => {
                                        return (<li className="dropDownItem" onClick={() => subOption.function() }><span>{subOption.text}</span></li>)
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