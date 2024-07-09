import Help from '../components/apps/Help';
import MediaPlayer from '../components/apps/MediaPlayer';
import PatchNotes from '../components/apps/PatchNotes';
import Blog from '../components/apps/Notepad';
import BlogList from '../components/apps/Documents';




const programIcons = {
    help: require('../img/help.png'),
    calendar: require('../img/calendar.png'),
    music: require('../img/music.png'),
    notepad : require('../img/notepad.png'),
    default: require('../img/redx.png'),
    documents: require('../img/documents.png'),
    mediaPlayer: require('../img/media_player.png'),
    windowsUpdate: require('../img/windows_update.png'),
    notepadDocument: require('../img/notepad_file.png'),
    minesweeper: require('../img/minesweeper.png'),
};

const programDefaults = {
    help: {
        icon: programIcons['help'],
        name: 'Help',
        defaultSize: {
            desktop: {
                width: '35vw',
                height: '35vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        openPosition: {
            x: 50,
            y: 50
        },
        contents: <Help />,
        minimumSize: {
            width: '20vw',
            height: '35vh',
        }
    },

    mediaPlayer: {
        icon: programIcons['mediaPlayer'],
        name: 'Windows Media Player',
        defaultSize: {
            desktop: {
                width: '35rem',
                height: '21rem',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
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
        icon: programIcons['windowsUpdate'],
        name: 'Windows Update',
        defaultSize: {
            desktop: {
                width: '30vw',
                height: '40vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
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
    },

    notepad: {
        icon: programIcons['notepad'],
        name: 'Notepad',
        defaultSize: {
            desktop: {
                width: '40vw',
                height: 'auto',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        openPosition: {
            x: 100,
            y: 100,
        },
        minimumSize: {
            width: '20rem',
            height: '17rem',
        },
        contents: <Blog />,
    },

    documents: {
        icon: programIcons['documents'],
        name: 'Documents',
        defaultSize: {
            desktop: {
                width: 'auto',
                height: 'auto',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        openPosition: {
            x: 100,
            y: 100,
        },
        minimumSize: {
            width: '20rem',
            height: '17rem',
        },
        contents: <BlogList />
    },
}

export const getProgramInfo = (programName) => {
    return programDefaults[programName] || {}
};

export const getProgramIcon = (programName) => {
    return programIcons[programName] || './img/redx.png'
};