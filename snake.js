import {snakeDir} from './utils.js';
export class Snake {
    _snakeParts = [
        {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)},
    ];
    _currentDirection = {x: 0, y: -1};
    incrementSnakeParts() {
        this._snakeParts++;
    }
    get getSnakeParts() {
        return this._snakeParts;
    }
    constructor() {

    }

    // Snake endless moving
    update() {
        const head
            = {
            x: this._snakeParts[0].x + this._currentDirection.x,
            y: this._snakeParts[0].y + this._currentDirection.y
        }
        for(let i = 1; i < this._snakeParts.length - 1; i++) {
            this._snakeParts[i + 1] = this._snakeParts[i];
        }
        this._snakeParts[1] = this._snakeParts[0];
        this._snakeParts[0] = head;
    }
    // Snake direction changing
    move() {
        document.addEventListener('keydown', ({key}) => {
            switch (key) {
                case snakeDir.UP:
                    if(this._currentDirection.y === 1) break;
                    this._currentDirection = {x: 0, y: -1};
                    break
                case snakeDir.DOWN:
                    if(this._currentDirection.y === -1) break;
                    this._currentDirection = {x: 0, y: 1};
                    break
                case snakeDir.LEFT:
                    if(this._currentDirection.x === 1) break;
                    this._currentDirection = {x: -1, y: 0};
                    break
                case snakeDir.RIGHT:
                    if(this._currentDirection.x === -1) break;
                    this._currentDirection = {x: 1, y: 0};
                    break
            }
        })
    }
}