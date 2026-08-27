import Help from '../components/apps/Help';
import MediaPlayer from '../components/apps/MediaPlayer';
import PatchNotes from '../components/apps/PatchNotes';
import Blog from '../components/apps/Notepad';
import BlogList from '../components/apps/Documents';
import MineSweeper from '../components/apps/MineSweeper/MineSweeper'
import GourdChat from '../components/apps/GourdChat'
import Poker from '../components/poker';
import TaskManager from '../components/apps/TaskManager';
import Warning from '../components/Warning';
import Explorer from '../components/apps/Explorer';
import Pong from '../components/apps/Games/gnop/Pong'


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
    gourdchat: require('../img/gourdchat.jpeg'),
    taskManager: require('../img/computer_gear.png'),
    explorer: require('../img/explorer.png'),
    pong: require('../img/explorer.png')
};

const programSounds = {
    warning: require('../sounds/error.mp3')
}

const programDefaults = {
    help: {
        icon: programIcons['help'],
        name: 'Help',
        defaultSize: {
            desktop: {
                width: '50',
                height: '50',
            },
            mobile: {
                width: '50',
                height: '70',
            },
        },
        resizable: true,
        contents: <Help />,
        minimumSize: {
            width: '35vw',
            height: '35vh',
        },
        // NOTE: X AND Y ARE IN VW VH
        x: '15',
        y: '15'
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
        minimumSize: {
            width: '35rem',
            height: '21rem',
        },
        resizable: true,
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
        },
        minimumSize: {
            width: '30rem',
            height: '17rem',
        },
        resizable: true,
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
        minimumSize: {
            width: '20rem',
            height: '17rem',
        },
        resizable: true,
        contents: <Blog />,
    },

    documents: {
        icon: programIcons['documents'],
        name: 'Documents',
        defaultSize: {
            desktop: {
                width: '25vw',
                height: '40vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        minimumSize: {
            width: '20rem',
            height: '17rem',
        },
        resizable: true,
        contents: <BlogList />
    },

    minesweeper: {
        icon: programIcons['minesweeper'],
        name: 'MineSweeper',
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
        minimumSize: {
            width: '0',
            height: '0',
        },
        resizable: true,
        contents: <MineSweeper />
    },

    gourdchat: {
        icon: programIcons['gourdchat'],
        name: 'Gourd Chat',
        defaultSize: {
            desktop: {
                width: '90vw',
                height: '70vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        contents: <Warning warningMessage={"The Boys are back."} openingSound={programSounds["warning"]}/>,
        minimumSize: {
            width: '1vw',
            height: '1vh',
        },
        resizable: false
    },

    taskManager: {
        icon: programIcons['taskManager'],
        name: 'Task Manager',
        defaultSize: {
            desktop: {
                width: '90vw',
                height: '70vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        contents: <TaskManager/>,
        minimumSize: {
            width: '10vw',
            height: '10vh',
        },
        resizable: true
    },

    explorer: {
        icon: programIcons['taskManager'],
        name: 'Explorer',
        defaultSize: {
            desktop: {
                width: '90vw',
                height: '70vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        contents: <Explorer/>,
        minimumSize: {
            width: '10vw',
            height: '10vh',
        },
        resizable: true
    },

    pong: {
        icon: programIcons['taskManager'],
        name: 'Pong',
        defaultSize: {
            desktop: {
                width: '90vw',
                height: '70vh',
            },
            mobile: {
                width: '90vw',
                height: '70vh',
            },
        },
        contents: <Pong/>,
        minimumSize: {
            width: '10vw',
            height: '10vh',
        },
        resizable: false
    },
}

export const getProgramInfo = (programName) => {
    return programDefaults[programName] || {}
};

export const getProgramIcon = (programName) => {
    return programIcons[programName] || './img/redx.png'
};