import Help from '../components/apps/Help';
import MediaPlayer from '../components/apps/MediaPlayer';
import PatchNotes from '../components/apps/PatchNotes';

const programIcons = {
    help: require('../img/help.png'),
    calendar: require('../img/calendar.png'),
    music: require('../img/music.png'),
    notepad : require('../img/notepad.png'),
    default: require('../img/redx.png'),
    documents: require('../img/documents.png'),
    mediaPlayer: require('../img/media_player.png'),
    windowsUpdate: require('../img/windows_update.png'),
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

    mediaPlayer: {
        icon: require('../img/media_player.png'),
        name: 'Windows Media Player',
        defaultSize: {
            width: '35rem',
            height: '21rem',
        },
        openPosition: {
            x: 200,
            y: 200,
        },
        minimumSize: {
            width: '35rem',
            height: '21rem',
        },
        contents: <MediaPlayer />,
    },

    windowsUpdate: {
        icon: require('../img/windows_update.png'),
        name: 'Windows Update',
        defaultSize: {
            width: '40rem',
            height: '25rem',
        },
        openPosition: {
            x: 100,
            y: 100,
        },
        minimumSize: {
            width: '30rem',
            height: '17rem',
        },
        contents: <PatchNotes />,
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