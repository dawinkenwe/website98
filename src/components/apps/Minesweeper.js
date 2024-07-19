import React, { useEffect, useState } from 'react';
import './Minesweeper.css';
import { produce } from 'immer';
import classNames  from 'classnames';

const adjacentIndexOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const createNewGrid = (numRows, numCols, numMines) => {
	console.log('CREATING NEW GRID');
	const grid = Array.from({ length: numRows }, () => {
		return (Array.from({ length: numCols }, () => ({ hasMine: false, adjacencyCount: 0, display: '' })))
	});

	const minePositions = new Set();

	while (minePositions.size < numMines) {
		const newX = Math.floor(Math.random() * 9);
		const newY = Math.floor(Math.random() * 9);
		minePositions.add(`${newX},${newY}`);
	}

	for (const position of minePositions) {
		let [x, y] = position.split(',').map(Number);
		grid[x][y].hasMine = true;
		for (const offset of adjacentIndexOffsets) {
			let dx = offset[0];
			let dy = offset[1];
			if (-1 < x + dx && x + dx < numRows && -1 < y + dy && y + dy < numCols) {
				grid[x + dx][y + dy].adjacencyCount += 1;
			}
		}
	}
	return grid;
};

// TODO: Add css, make it so end actually shows all squares, etc.

const MineSweeper = () => {
	const [grid, setGrid] = useState(() => createNewGrid(9, 9, 9));
	const [gameOver, setGameOver] = useState(false);
	const rows = 9;
	const columns = 9;

	const endGame = () => {
		console.log('GAME OVER');
		setGameOver(true);
		setGrid(produce(grid, draft => {
			console.log('updating state for end game');
			draft.forEach(row => {
				row.forEach(cell => {
					if (cell.hasMine) {
						console.log('updating m');
						cell.display = 'm';
					} else if (cell.adjacencyCount) {
						console.log('updating num');
						cell.display = cell.adjacencyCount;
					} else {
						console.log('updating _');
						cell.display = '_';
					}
				});
			});
		}));
		console.log(grid);
	};

	console.log("Component re-rendering with grid:", grid);

	const handleLeftClick = (x, y) => {
		// Note - react state checks for re-renders as a NEW OBJECT.
		// We need to return a NEW OBJECT if we want to update the state.
		if (gameOver) {
			return;
		}
		console.log('clicked on x: ' + x + ' y: ' + y);
		if (grid[x][y].display && grid[x][y].display !== 'f') {
			return;
		}
		if (grid[x][y].hasMine) {
			endGame();
		} else {
			setGrid(produce(grid, draft => {
				const cell = draft[x][y];
				cell.display = cell.adjacencyCount ? cell.adjacencyCount : '_';
			}));
			console.log(grid);
		}
	}

	return (
		<div className="minesweeper">
			<div className="minesweeper-grid">
				{grid.slice(0, rows).map((gridRow, x) => {
					return (
						<div className="minesweeper-row">
							{gridRow.slice(0, columns).map((value, y) => {
								return (
									<div className={classNames('minesweeper-square', {

									})} onClick={() => handleLeftClick(x, y)}>
										{value.display}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default MineSweeper;