import React, { useEffect, useState } from 'react';

const MinesweeperGridSquare = ({ hasMine, adjacencyCount, mineCallback, emptyCallback }) => {
	const [hasFlag, setFlag] = useState(false);
	const [revealed, setRevealed] = useState(false);
	const [display, setDisplay] = useState('');

	const handleLeftClick = () => {
		setRevealed(true);
		if (hasMine) {
			setDisplay('*');
			mineCallback();
		} else if (adjacencyCount === 0) {
			emptyCallback();
		}
		setDisplay(adjacencyCount);
	}

	const handleRightClick = () => {
		setDisplay(hasFlag ? '' : 'f');
		setFlag(!hasFlag)
	}

	return (
		<div className="minesweeper-grid-square" onClick={handleLeftClick} onContextMenu={handleRightClick }>
			<div className="minesweeper-grid-square-contents">
				{ display }
			</div>
		</div>
	)
}

const Minesweeper = () => {
	const [grid, setGrid] = useState([[]]);
	const [gameOver, setGameOver] = useState(false);
	const rows = 9;
	const columns = 9;

	useEffect(() => {
		// Create the 9 x 9 grid with initial values
		const createEmptyGrid = (rows, columns) => {
			return Array.from({ length: rows }, () => {
				Array.from({ length: columns }, () => ({ hasMine: false, adjacencyCount: 0, display: '' }))
			})
		}

		const inBounds = (x, y) => {
			return -1 < x < rows && -1 < y < columns;
		}

		const newgrid = createEmptyGrid();
		let numMines = 10;
		while (numMines !== 0) {
			let x = Math.floor(Math.random() * 9);
			let y = Math.floor(Math.random() * 9);
			if (!newgrid[x][y].hasMine) {
				newgrid[x][y].hasMine = true;
				const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
				neighbors.foreEach(([dx, dy]) => {
					if (inBounds(x + dx, y + dy)) {
						newgrid[x + dx][y + dy].adjacencyCount += 1;
					}
				});
				numMines -= 1;
			}
		}
		setGrid(newgrid);

	}, []);

	const endGame = () => {
		return;
	}

	const handleLeftClick = (x, y) => {
		if (gameOver) {
			return;
		}
		if (grid[x][y].display && grid[x][y].display !== 'f') {
			return;
		}

		if (grid[x][y].hasMine) {
			grid[x][y].display = 'm';
			endGame();
		} else {
			grid[x][y].display = grid[x][y].adjacencyCount ? grid[x][y].adjacencyCount : ' ';
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
									<div className="minesweeper-square">
										{grid[x][y].display}
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