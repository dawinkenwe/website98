import React, { useEffect, useReducer, useState } from 'react';
import './Minesweeper.css';
import { produce } from 'immer';
import classNames from 'classnames';
import SevenSegmentDisplay from './SevenSegmentDisplay';
import MinesweeperClock from './MinesweeperClock';
import reducer, { createNewGrid } from './Reducer.js'

const initialState = { grid: () => createNewGrid(9, 9, 10), squaresRemaining: 9 * 9 - 10, gameStatus: '', mines: 10, flags: 10 }

const MineSweeper = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleRightClick = (e, x, y) => {
		e.preventDefault();
		dispatch({ type: 'right_click', payload: { x: x, y: y } })
	}

	const handleLeftClick = (x, y) => {
		console.log('trying click');
		if (state.gameStatus) {
			console.log(state.gameStatus);
			console.log('bailing from status');
			return;
		}

		if (state.grid[x][y].display && state.grid[x][y].display !== 'f') {
			console.log('bailing from already displayed')
			return;
		}
		if (state.grid[x][y].hasMine) {
			dispatch({ type: 'end_game', payload: { gameStatus: 'loss' } })
		} else {
			console.log('spawning update_cell event');
			console.log(state.squaresRemaining + ' squares remaining before');
			dispatch({ type: 'update_cell', payload: { x: x, y: y } });
			console.log(state.squaresRemaining + ' squares remaining after');
			if (!state.squaresRemaining) {
				console.log('WINNING');
				dispatch({ type: 'end_game', payload: { gameStatus: 'win' } });
			}
		}
	}

	return (
		<div className="minesweeper">
			<MinesweeperClock isTicking={true} />
			<div className="minesweeper-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${state.grid.length}, 1.25rem)`, columnGap: '5px', rowGap: '5px' }} onContextMenu={(e) => e.preventDefault()}>
				{state.grid.map((row, x) => (
					<>
						{row.map((value, y) => (
							<div className='minesweeper-square' onClick={() => handleLeftClick(x, y)} onContextMenu={(e) => handleRightClick(e, x, y)}>{value.display}</div>
						))}
					</>
				))}
			</div>
		</div>
	)
}

export default MineSweeper;