import {gameSpeed} from "./utils.js";
import {Snake} from "./snake.js";
import {Food} from "./food.js";

// Game entry point
class Main {
    lastRenderTime = 0;

    constructor(gameBoard, snake, food) {
        this._snake = snake;
        this._food = food;
        this._gameBoard = gameBoard;
    }

    // Drawing snake on game board
    drawSnake() {
        this._snake.getSnakeParts.forEach(part => {
            const snakePart = document.createElement('div');
            snakePart.style.gridColumnStart = part.x;
            snakePart.style.gridRowStart = part.y;
            snakePart.id = 'snake';
            this._gameBoard.appendChild(snakePart);
        })
    }

    drawFood() {
        const food = document.createElement('div');
        food.style.gridColumnStart = this._food.getFoodPos.x;
        food.style.gridRowStart = this._food.getFoodPos.y;
        food.id = 'food';
        this._gameBoard.appendChild(food);
    }

    isFoodEaten() {
        if (this._snake.getSnakeParts[0].x === this._food.getFoodPos.x
            && this._snake.getSnakeParts[0].y === this._food.getFoodPos.y) {
            this._snake.incrementSnakeParts();
            this._food.updateFoodPos();
        }
    }

    // Game loop
    polling(currentTime) {
        window.requestAnimationFrame((time) => this.polling(time));
        if (currentTime - this.lastRenderTime > gameSpeed) {
            this._gameBoard.innerHTML = '';
            this._snake.update();
            this.isFoodEaten();
            this.drawFood();
            this.drawSnake();
            this.lastRenderTime = currentTime;
        }
    }

    // Game start
    start() {
        this._snake.move();
        this.polling();
    }

}

const snake = new Snake();
const food = new Food();
const game = new Main(document.querySelector('#gameBoard'), snake, food)
game.start();
window.requestAnimationFrame((time) => game.polling(time));

