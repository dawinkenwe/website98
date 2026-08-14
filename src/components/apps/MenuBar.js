import { useState } from "react";
import "./MenuBar.css";

const MenuBar = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleMenuClick = (option) => {
        setSelectedOption(
            selectedOption === null ?  option: null
        );
    };

    const handleHover = (option) => {
        if (selectedOption && selectedOption !== option) {
            setSelectedOption(option);
        }
    }

    return (
        <div className="program-menu-bar">
            <div className="win98-menu-bar">
                {Object.entries(options).map(([option, subOptions]) => (
                    <div key={option} className={option === selectedOption ? "win98-menu" : "win98-menu"}>
                        <div
                            className="menu-button"
                            onClick={() => handleMenuClick(option)}
                            onMouseEnter={() => handleHover(option)}
                        >
                            {option}
                        </div>

                        {selectedOption === option && (
                            <div className="win98-dropdown">
                                {subOptions.map((subOption) => (
                                    <div
                                        key={subOption}
                                        className="win98-menu-item"
                                        onClick={() => {
                                            console.log("clicked:", subOption);
                                            setSelectedOption(null);
                                        }}
                                    >
                                        {subOption}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuBar;
