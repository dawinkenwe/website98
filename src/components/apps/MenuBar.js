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
        <div className="dropdown-menu-wrapper">
            <div className="dropdown-menu">
                {Object.entries(options).map(([option, subOptions]) => (
                    <div key={option}>
                        <div
                            className="menu-button"
                            onClick={() => handleMenuClick(option)}
                            onMouseEnter={() => handleHover(option)}
                        >
                            {option}
                        </div>

                        {selectedOption === option && (
                            <div className="dropdown-submenu">
                                {subOptions.map((subOption) => (
                                    <div
                                        key={subOption}
                                        className="dropdown-submenu-button"
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
