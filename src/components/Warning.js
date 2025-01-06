import {useEffect} from "react";
import { useAppContext } from '../AppContext';
import './Warning.css';


const imgStyle = {}
const textStyle = {textAlign: 'center', flex: '1', paddingLeft: '10px'}

const Warning = ({warningMessage, openingSound}) => {
    const { state, dispatch } = useAppContext();
    const okButtonClicked = () => {
        dispatch({ type: 'CLOSE_APP', id: state.activeComponent });
    }

    useEffect(() => {
        if (openingSound) {
            const audio = new Audio(openingSound);
            audio.play();
        }
    }, [openingSound])

    return (
        <div className="warningContainer">
            <div className="warningImageAndText">
                <img src={require('../../src/img/warning.png')} alt="m" height="40" width="40" style={imgStyle} />
                <p className="error" style={textStyle}>{warningMessage}</p>
            </div>
            <div className="warningButtons">
                <button onClick={okButtonClicked} style={{textAlign: "center", }}>OK</button>
            </div>
        </div>
    )
}

export default Warning;