import {snakeDir, gridOptions} from './utils.js';

export class Snake {
    _snakeParts = [
        {x: Math.floor(Math.random() * gridOptions.gridRows), y: Math.floor(Math.random() * gridOptions.gridColumns)},
    ];
    _currentDirection = {x: 0, y: -1};
    updateSnakePos() {
        this._snakeParts = [{
            x: Math.ceil(Math.random() * gridOptions.gridColumns),
            y: Math.ceil(Math.random() * gridOptions.gridRows)
        }]
    }
    incrementSnakeParts() {
        this._snakeParts.push({...this._snakeParts[this.snakeSize - 1]});
    }

    get getSnakeParts() {
        return this._snakeParts;
    }

    get snakeSize() {
        return this._snakeParts.length;
    }

    isSnakeIntersects() {
        return this._snakeParts.some((part, index) => {
            return index ? this._snakeParts[0].x === part.x &&
                this._snakeParts[0].y === part.y
                : false;
        })
    }

    // Snake endless moving
    update() {
        for (let i = this.snakeSize - 1; i > 0; i--) {
            this._snakeParts[i] = {...this._snakeParts[i - 1]};
        }
        const headX = this._snakeParts[0].x + this._currentDirection.x;
        const headY = this._snakeParts[0].y + this._currentDirection.y;
        const xPos = headX > gridOptions.gridColumns ? 1
            : headX < 1 ? gridOptions.gridColumns : headX;
        const yPos = headY > gridOptions.gridRows ? 1
            : headY < 1 ? gridOptions.gridRows : headY;
        this._snakeParts[0].x = xPos;
        this._snakeParts[0].y = yPos;
    }

    // Snake direction changing
    move() {
        document.addEventListener('keydown', ({key}) => {
            switch (key) {
                case snakeDir.UP:
                    if (this._currentDirection.y === 1) break;
                    this._currentDirection = {x: 0, y: -1};
                    break
                case snakeDir.DOWN:
                    if (this._currentDirection.y === -1) break;
                    this._currentDirection = {x: 0, y: 1};
                    break
                case snakeDir.LEFT:
                    if (this._currentDirection.x === 1) break;
                    this._currentDirection = {x: -1, y: 0};
                    break
                case snakeDir.RIGHT:
                    if (this._currentDirection.x === -1) break;
                    this._currentDirection = {x: 1, y: 0};
                    break
            }
        })
    }
}