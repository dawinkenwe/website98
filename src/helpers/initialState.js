import { v4 as uuidv4 } from 'uuid';


const getInitialState = () => {
    const shortcutId = uuidv4();

    const initialState = {
        components: {},
        componentIds: [],
        activeComponent: '',
        isStartMenuOpen: false,
        nextZ: 10,
        shortcuts: {
            [shortcutId]: {
                img: require('../img/trash_full.png'),
                name: 'Recycle Bin',
                text: 'Recycle Bin',
            },
        }
    }

    return initialState;
}

export default getInitialState;