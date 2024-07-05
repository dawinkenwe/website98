import { v4 as uuidv4 } from 'uuid';


const getInitialState = () => {
    const shortcutIds = [uuidv4(), uuidv4()];

    const initialState = {
        components: {},
        componentIds: [],
        activeComponent: '',
        isStartMenuOpen: false,
        nextZ: 10,
        shortcuts: {
            [shortcutIds[0]]: {
                img: require('../img/trash_full.png'),
                name: 'Recycle Bin',
                text: 'Recycle Bin',
            },
            [shortcutIds[1]]: {
                img: require('../img/internet_explorer.png'),
                name: 'Internet Explorer',
                text: 'Internet Explorer',
            }
        },
        deviceType: 'desktop',
    }

    return initialState;
}

export default getInitialState;