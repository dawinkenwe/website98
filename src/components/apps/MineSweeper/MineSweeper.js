import React, { useEffect, useState } from 'react';
import './Minesweeper.css';
import { produce } from 'immer';
import classNames from 'classnames';
import SevenSegmentDisplay from './SevenSegmentDisplay';
import MinesweeperClock from './MinesweeperClock';

const adjacentIndexOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const createNewGrid = (numRows, numCols, numMines) => {
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

const MineSweeper = () => {
	const [grid, setGrid] = useState(() => createNewGrid(9, 9, 9));
	const [gameOver, setGameOver] = useState(false);
	const rows = 9;
	const columns = 9;

	const endGame = () => {
		setGameOver(true);
		setGrid(produce(grid, draft => {
			draft.forEach(row => {
				row.forEach(cell => {
					if (cell.hasMine) {
						cell.display = 'm';
					} else if (cell.adjacencyCount) {
						cell.display = cell.adjacencyCount;
					} else {
						cell.display = '_';
					}
				});
			});
		}));
	};


	const getAdjacentEmptySquares = (xStart, yStart) => {
		const emptySquares = new Set();
		emptySquares.add(`${xStart},${yStart}`)
		const exploreQueue = [`${xStart},${yStart}`];

		while (exploreQueue.length > 0) {
			let [x, y] = exploreQueue.pop().split(',').map(Number);
			for (const offset of adjacentIndexOffsets) {
				let [dx, dy] = offset;
				if (-1 < x + dx && x + dx < rows && -1 < y + dy && y + dy < columns && grid[x + dx][y + dy].display	 === '' && !emptySquares.has(`${x + dx},${y + dy}`) && !grid[x+dx][y+dy].hasMine && !grid[x+dx][y+dy].adjacencyCount) {
					emptySquares.add(`${x + dx},${y + dy}`);
					exploreQueue.push(`${x + dx},${y + dy}`);
				}
			}
		}
		return emptySquares;
	}

	const handleRightClick = (e, x, y) => {
		e.preventDefault();
		if (grid[x][y].display === '') {
			setGrid(produce(grid, draft => {
				draft[x][y].display = 'f';
			}));
		} else if (grid[x][y].display === 'f') {
			setGrid(produce(grid, draft => {
				draft[x][y].display = '';
			}));
		}
	}

	const handleLeftClick = (x, y) => {
		if (gameOver) {
			return;
		}
		if (grid[x][y].display && grid[x][y].display !== 'f') {
			return;
		}
		if (grid[x][y].hasMine) {
			endGame();
		} else if (grid[x][y].adjacencyCount > 0) {
			setGrid(produce(grid, draft => {
				draft[x][y].display = draft[x][y].adjacencyCount;
			}));
		} else if (grid[x][y].display === ''){ 
			let emptySquares = getAdjacentEmptySquares(x, y);
			const newGrid = grid.map((row, x) => (
				row.map((value, y) => ({
					...value,
					display: emptySquares.has(`${x},${y}`) ? '_' : value.display
				}))
			));
			setGrid(newGrid);
		}
	}

	return (
		<div className="minesweeper">
			<MinesweeperClock isTicking={true} />
			<div className="minesweeper-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1.25rem)`, columnGap: '5px', rowGap: '5px' }} onContextMenu={(e) => e.preventDefault()}>
				{grid.map((row, x) => (
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