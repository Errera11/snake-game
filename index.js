import {boardOptions, gameSpeed} from "./utils.js";
import {Snake} from "./snake.js";

// Game entry class
class Main {
    lastRenderTime = 0;
    constructor(gameBoard, snake) {
        this._snake = snake;
        this._gameBoard = gameBoard;
        this._gameBoard.style.width = boardOptions.width + 'px';
        this._gameBoard.style.height = boardOptions.height + 'px';
    }
    // Setting game board dom element
    get gameBoard() {
        return this._gameBoard;
    }
    // Drawing snake on the game board
    drawSnake() {
        this._snake.getSnakeParts.forEach(part => {
            const drawnPart = document.createElement('div');
            drawnPart.style.gridColumnStart = part.x;
            drawnPart.style.gridRowStart = part.y;
            drawnPart.id = 'snake';
            this._gameBoard.appendChild(drawnPart)
        })
    }
    drawFood() {

    }
    // Game loop
    polling(currentTime) {
        window.requestAnimationFrame((time) => this.polling(time));
        if(currentTime - this.lastRenderTime > gameSpeed) {
            this._gameBoard.innerHTML = '';
            this.drawSnake();
            this._snake.update();
            this.lastRenderTime = currentTime;
        }
    }
    // Game start
    start() {
        this._snake.move();
        this.polling();
    }

}

const snake = new Snake()
const game = new Main(document.querySelector('#gameBoard'), snake)
game.start(game.gameBoard);
window.requestAnimationFrame((time) => game.polling(time));

