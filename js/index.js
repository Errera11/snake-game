import {gameSpeed} from "./utils.js";
import {Snake} from "./snake.js";
import {Food} from "./food.js";

// Game entry point
class Main {
    lastRenderTime = 0;
    isGameOver = false;

    constructor(gameBoard, snake, food) {
        this._snake = snake;
        this._food = food;
        this._gameBoard = gameBoard;
    }
    resetGameScore() {
        const gameScore = document.querySelector('#score');
        gameScore.innerHTML = 0;
    }
    updateGameScore() {
        const gameScore = document.querySelector('#score');
        gameScore.innerHTML = 1 + Number(gameScore.innerHTML);
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
    showModal() {
        const modal = document.querySelector('#gameOverContainer');
        modal.style.display = 'flex';
    }
    hideModal() {
        const modal = document.querySelector('#gameOverContainer');
        modal.style.display = 'none';
    }
    isFoodEaten() {
        if (this._snake.getSnakeParts[0].x === this._food.getFoodPos.x
            && this._snake.getSnakeParts[0].y === this._food.getFoodPos.y) {
            this._snake.incrementSnakeParts();
            this._food.updateFoodPos();
            this.updateGameScore();
            return true;
        }
        return false;
    }

    // Game loop
    loop(currentTime) {
        if(this.isGameOver) return;
        window.requestAnimationFrame((time) => this.loop(time));
        if (currentTime - this.lastRenderTime > gameSpeed) {
            this._gameBoard.innerHTML = '';
            this.isFoodEaten();
            this._snake.update();
            if (this._snake.isSnakeIntersects()) {
                this.isGameOver = true;
                this.showModal();
            }
            this.drawFood();
            this.drawSnake();
            this.lastRenderTime = currentTime;
        }
    }

    // Game start
    start() {
        this._snake.move();
        this._snake.updateSnakePos();
        this._food.updateFoodPos();
        document.querySelector('#restart').addEventListener('click', e => {
            this.isGameOver = false;
            this.resetGameScore();
            this.hideModal();
            this.start();
        })
        this.loop();
    }

}

const snake = new Snake();
const food = new Food();
const game = new Main(document.querySelector('#gameBoard'), snake, food)
game.start();
window.requestAnimationFrame((time) => game.loop(time));

