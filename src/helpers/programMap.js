const programIcons = {
    help: require('../img/help.png'),
    calendar: require('../img/calendar.png'),
    music: require('../img/music.png'),
    notepad : require('../img/notepad.png'),
    default: require('../img/redx.png')
};

export const getProgramIcon = (programName) => {
    return programIcons[programName] || './img/redx.png'
};