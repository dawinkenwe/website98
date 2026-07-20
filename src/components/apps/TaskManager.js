import React from 'react';
import { useAppContext } from '../../AppContext';


const TaskManager = () => {
    const { state, dispatch } = useAppContext();

    return (
        <div class="TaskManager">
            <table class="interactive">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Process ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(state.components).map(component => (
                                <tr>
                                    <td>{component.name}</td>
                                    <td>{component.id}</td>
                                    <td>Running</td>
                                </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskManager;