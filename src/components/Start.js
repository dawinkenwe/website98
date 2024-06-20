import './TaskBar.css'

const StartMenu = () => {
    return (
        <div id="start-menu" class="windows-box-shader">
            <div id="windows-start-menu-blue">Windows<span>98</span></div>
            <ul>
                <li class="line update"><label for="windows-update-input"><img src="public/help.png" style={{ width: "1.5rem" }} alt="help"/>Help</label></li>
            </ul>
        </div>
    );
}

const StartButton = () => {
    return (
        <></>
    );
};

export { StartMenu, StartButton }