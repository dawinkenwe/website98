import { useReducer } from 'react';
import { produce } from 'immer';

const adjacentIndexOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export const createNewGrid = (numRows, numCols, numMines) => {
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

const getAdjacentEmptySquares = (grid, xStart, yStart) => {
	let rows = grid.length;
	let columns = grid[0].length;
	const emptySquares = new Set();
	emptySquares.add(`${xStart},${yStart}`)
	const exploreQueue = [`${xStart},${yStart}`];

	while (exploreQueue.length > 0) {
		let [x, y] = exploreQueue.pop().split(',').map(Number);
		for (const offset of adjacentIndexOffsets) {
			let [dx, dy] = offset;
			if (-1 < x + dx && x + dx < rows && -1 < y + dy && y + dy < columns && grid[x + dx][y + dy].display === '' && !emptySquares.has(`${x + dx},${y + dy}`) && !grid[x + dx][y + dy].hasMine && !grid[x + dx][y + dy].adjacencyCount) {
				emptySquares.add(`${x + dx},${y + dy}`);
				exploreQueue.push(`${x + dx},${y + dy}`);
			}
		}
	}
	return emptySquares;
}

function reducer(state, action) {
	switch (action.type) {
		case 'initialize_grid': {
			return produce(state, draft => {
				draft.grid = createNewGrid(action.payload.rows, action.payload.columns, action.payload.mines);
				draft.gameStatus = '';
				draft.mines = action.payload.mines;
				draft.squaresRemaining = action.payload.rows * action.payload.columns - action.payload.mines;
				draft.flags = action.payload.mines;
			})
		}
		case 'end_game': {
			return produce(state, draft => {
				draft.gameStatus = action.payload.gameStatus;
				draft.grid.forEach(row => {
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
			});
		}
		case 'right_click': {
			if (state.grid[action.payload.x][action.payload.y].display === '') {
				return (produce(state, draft => {
					draft.grid[action.payload.x][action.payload.y].display = 'f';
				}));
			} else if (state.grid[action.payload.x][action.payload.y].display === 'f') {
				return (produce(state, draft => {
					draft.grid[action.payload.x][action.payload.y].display = '';
				}));
			}
			return state;
		}
		case 'update_cell': {
			console.log('updating cell?');
			if (state.grid[action.payload.x][action.payload.y].adjacencyCount) {
				return (produce(state, draft => {
					draft.grid[action.payload.x][action.payload.y].display = draft.grid[action.payload.x][action.payload.y].adjacencyCount;
				}))
			}
			let emptySquares = getAdjacentEmptySquares(state.grid, action.payload.x, action.payload.y, state.rows);
			console.log(emptySquares);
			console.log('updating empty squares')
			console.log('length is ' + emptySquares.size);
			return (produce(state, draft => {
				draft.grid = draft.grid.map((row, x) => (
					row.map((value, y) => ({
						...value,
						display: emptySquares.has(`${x},${y}`) ? '_' : value.display
					}))
				));
				draft.squaresRemaining = draft.squaresRemaining - emptySquares.size;
			}))
		}
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}

}

export default reducer;
