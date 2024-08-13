import { useEffect } from 'react';

const useClickOutside = (refs, onClickOutside) => {
    useEffect(() => {
        const handleClick = (event) => {
            if (refs.every(ref => ref.current && !ref.current.contains(event.target))) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [refs, onClickOutside]);
};

export default useClickOutside;