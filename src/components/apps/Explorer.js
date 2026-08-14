import {useEffect} from "react";
import { useAppContext } from '../../AppContext';
import './Explorer.css'

const Explorer = () => {
    const { state, dispatch } = useAppContext();

    return (
        <div className="explorer-body">
            <div className="explorer-menu-bar">1</div>

            <div className="row-two-left">2A</div>
            <div className="row-two-right">2B</div>

            <div className="row-three-left">3A</div>
            <div className="row-three-right">3B</div>

            <div className="row-four-left">4A</div>
            <div className="row-four-right">4B</div>

            <div className="bottom-bar">
                <div>5A</div>
                <div>5B</div>
            </div>
        </div>
    )
}

export default Explorer;