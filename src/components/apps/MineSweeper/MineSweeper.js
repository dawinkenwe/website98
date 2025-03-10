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

	// TODO: Use the array to calculate the total display size of the graph and
	// style it so that it can't be shrunk past that size, and it is always
	// centered in the page.

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

const getSmileyImage = (state) => {
	if (state === 'won') {
		return require("../../../img/minesweeper_victory.png")
	} else if (state === 'lost') {
		return require("../../../img/minesweeper_dead.png")
	} else {
		return require("../../../img/minesweeper_smile.png")
	}
}

const MineSweeper = ({rows = 9, columns = 9, mines = 10}) => {
	const [grid, setGrid] = useState(() => createNewGrid(rows, columns, mines));
	const [gameStatus, setGameStatus] = useState('');
	const [revealedCount, setRevealedCount] = useState(0);
	const [numFlags, setNumFlags] = useState(mines);
	const [started, setStarted] = useState(false);

	const endGame = (status) => {
		setGameStatus(status);
		setGrid(produce(grid, draft => {
			draft.forEach(row => {
				row.forEach(cell => {
					if (cell.hasMine) {
						cell.display = <img src={require('../../../img/minesweeper.png')} alt="m" height="20" width="20" style={{ background: 'red' }} />;
					} else if (status === 'won') {
						if (!cell.adjacencyCount) {
							cell.display = '_';
						} else {
							cell.display = cell.adjacencyCount;
						}
					}
				});
			});
		}));
	};


	const getAdjacentEmptySquares = (xStart, yStart) => {
		const emptySquares = new Set();
		const exploreQueue = [`${xStart},${yStart}`];

		while (exploreQueue.length > 0) {
			let [x, y] = exploreQueue.pop().split(',').map(Number);
			emptySquares.add(`${x},${y}`);
			if (!grid[x][y].adjacencyCount) {
				for (const offset of adjacentIndexOffsets) {
					let [dx, dy] = offset;
					if (-1 < x + dx && x + dx < rows && -1 < y + dy && y + dy < columns && grid[x + dx][y + dy].display === '' && !emptySquares.has(`${x + dx},${y + dy}`) && !grid[x + dx][y + dy].hasMine) {
						emptySquares.add(`${x + dx},${y + dy}`);
						exploreQueue.push(`${x + dx},${y + dy}`);
					}
				}
			}

		}
		return emptySquares;
	}

	const handleRightClick = (e, x, y) => {
		e.preventDefault();
		if (grid[x][y].display === '' && numFlags > 0) {
			setGrid(produce(grid, draft => {
				draft[x][y].display = 'f';
			}));
			setNumFlags(numFlags - 1);
		} else if (grid[x][y].display === 'f') {
			setGrid(produce(grid, draft => {
				draft[x][y].display = '';
			}));
			setNumFlags(numFlags + 1);
		}
	}

	const handleLeftClick = (x, y) => {
		if (gameStatus) return;
		if (grid[x][y].display && grid[x][y].display !== 'f') return;
		setStarted(true);
		if (grid[x][y].hasMine) {
			endGame('lost');
		} else if (grid[x][y].adjacencyCount > 0) {
			setGrid(produce(grid, draft => {
				draft[x][y].display = draft[x][y].adjacencyCount;
			}));
			if (revealedCount + 1 === rows * columns - mines) {
				endGame('won');
			}
			setRevealedCount(revealedCount + 1);
		} else if (grid[x][y].display === '') {
			let emptySquares = getAdjacentEmptySquares(x, y);
			setGrid(produce(grid, draft => {
				for (const square of emptySquares) {
					let [x, y] = square.split(',').map(Number);

					if (draft[x][y].adjacencyCount) {
						draft[x][y].display = draft[x][y].adjacencyCount;
					} else {
						draft[x][y].display = '_';
					}
				}
			}));
			if (emptySquares.size + revealedCount === rows * columns - mines) {
				endGame('won');
			}
			setRevealedCount(revealedCount + emptySquares.size);
		}

	}

	return (
		<div className="minesweeper">
			<div className="minesweeper-header-content">
				<div className="minesweeper-flag-count">
					<SevenSegmentDisplay value={Math.floor(numFlags / 100)} />
					<SevenSegmentDisplay value={Math.floor(numFlags / 10)} />
					<SevenSegmentDisplay value={Math.floor(numFlags % 10)} />
				</div>
				<div className="minesweeper-smiley-container">
					<img className="minesweeper-smile-img" src={getSmileyImage(gameStatus)} alt="minesweeper_smiley" width="36" height="36"></img>
				</div>
				<div className="minesweeper-clock">
					<MinesweeperClock isTicking={started && gameStatus === ''} />
				</div>
			</div>
			<div className="minesweeper-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1.25rem)`, columnGap: '5px', rowGap: '5px' }} onContextMenu={(e) => e.preventDefault()}>
				{grid.map((row, x) => (
					<>
						{row.map((value, y) => (
							<div className={classNames('minesweeper-square', {
								'colorBlue': value.display === 1,
								'colorGreen': value.display === 2,
								'colorRed': value.display === 3,
								'colorDarkBlue': value.display === 4,
								'colorDarkRed': value.display === 5,
								'colorTurquoise': value.display === 6,
								'colorBlack': value.display === 7,
								'colorGray': value.display === 8,
								'windows-box-shadow': value.display === '' || value.display === 'f',
								'dotted-border': value.display !== '' && value.display !== 'f'
							})} onClick={() => handleLeftClick(x, y)} onContextMenu={(e) => handleRightClick(e, x, y)}>{value.display === 'f' ? <img src={require('../../../img/minesweeper_flag.png')} height="16px" width="16px" alt="f"/> : value.display}</div>
						))}
					</>
				))}
			</div>
		</div>
	)
}

export default MineSweeper;