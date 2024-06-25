const programIcons = {
    help: require('../img/help.png'),
    calendar: require('../img/calendar.png'),
    music: require('../img/music.png'),
    notepad : require('../img/notepad.png'),
    default: require('../img/redx.png')
};

const programDefaults = {
    help: {
        img: require('../img/help.png'),
        name: 'Help',
        defaultSize: {
            width: 200,
            height: 200
        }
    }
}

const getProgramInfo = (programName) => {
    return programDefaults[programName] || {}
};

export const getProgramIcon = (programName) => {
    return programIcons[programName] || './img/redx.png'
};