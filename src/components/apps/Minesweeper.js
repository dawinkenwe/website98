import React, { useEffect, useState } from 'react';
import './Minesweeper.css';
import {produce} from 'immer';

const adjacentIndexOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const createNewGrid = (numRows, numCols, numMines) => {
	const grid = Array.from({ length: numRows }, () => {
		return (Array.from({ length: numCols }, () => ({ hasMine: false, adjacencyCount: 0, display: '' })))
	});

	console.log(grid);

	const minePositions = new Set();

	// while set length < numMines
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
				console.log(grid);
				grid[x + dx][y + dy].adjacencyCount += 1;
			}
		}
	}
	console.log(grid);
	return grid;
};

// TODO: Add css, make it so end actually shows all squares, etc.

const MineSweeper = () => {
	const [grid, setGrid] = useState(createNewGrid(9, 9, 9));
	const [gameOver, setGameOver] = useState(false);
	const rows = 9;
	const columns = 9;

	const endGame = () => {
		console.log('GAME OVER');
		setGameOver(true);
		setGrid(produce(grid, draft => {
			draft.forEach(row => {
				row.forEach(cell => {
					if (cell.hasMine) {
						cell.value = 'm';
					} else if (cell.adjacencyCount) {
						cell.value = cell.adjacencyCount;
					}
				})
			})
		}))
	};

	const handleLeftClick = (x, y) => {
		// Note - react state checks for re-renders as a NEW OBJECT.
		// We need to return a NEW OBJECT if we want to update the state.
		console.log('handling left click');
		console.log('x: ' + x + ' y: ' + y);
		if (gameOver) {
			return;
		}
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
									<div className="minesweeper-square" onClick={() => handleLeftClick(x, y)}>
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