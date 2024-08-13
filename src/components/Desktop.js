import React from 'react';
import './Desktop.css';
import DesktopShortcut from './DesktopShortcut';
import { useAppContext } from '../AppContext';

const Desktop = () => {
    const { state, dispatch } = useAppContext();
    /* for phone vertical use a 3 columns, 5 rows with same sizes and gap.*/
    return (
        <div className="desktop" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(16, 7rem)`,
            gridTemplateRows: `repeat(8, 6.25rem)`,
            columnGap: '5px', rowGap: '5px'
        } }>
            {Object.entries(state.shortcuts).map(([id, value]) =>
                <DesktopShortcut key={id} id={id} />
            )}
        </div>
    );
};

export default Desktop;