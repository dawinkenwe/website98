import Help from '../components/apps/Help';

const programIcons = {
    help: require('../img/help.png'),
    calendar: require('../img/calendar.png'),
    music: require('../img/music.png'),
    notepad : require('../img/notepad.png'),
    default: require('../img/redx.png')
};

const programDefaults = {
    help: {
        icon: require('../img/help.png'),
        name: 'Help',
        defaultSize: {
            width: '40rem',
            height: '20rem'
        },
        openPosition: {
            x: 50,
            y: 50
        },
        contents: <Help />,
        minimumSize: {
            width: '32rem',
            height: '20rem',
        }
    },
    windowsUpdate: {
        icon: require('../img/windows_update.png'),
        name: 'Windows Update',
        defaultSize: {
            width: '60rem',
            height: '25rem',
        },
        openPosition: {
            x: 100,
            y: 100,
        },
        contents: 'update'
    }
}

export const getProgramInfo = (programName) => {
    console.log('PROGRAM INFO');
    console.log(programDefaults[programName]);
    return programDefaults[programName] || {}
};

export const getProgramIcon = (programName) => {
    return programIcons[programName] || './img/redx.png'
};