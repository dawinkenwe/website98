import './ProgramMenu.css'
import { useState } from 'react';


const ProgramMenu = ({props}) => {
    const selectedOption = useState(null);

    return (
    <div className="menu-bar">
        {props.map((option, index) => {
            return (
                <div className="menuItem">{option.text}</div>
            )
        })}
    </div>)
}

export default ProgramMenu