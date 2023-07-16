import {gridOptions} from './utils.js';
export class Food {
    constructor() {
        this.updateFoodPos();
    }
    get getFoodPos() {
        return this._foodPosition;
    }
    updateFoodPos() {
        this._foodPosition = {
            x: Math.ceil(Math.random() * gridOptions.gridColumns),
            y: Math.ceil(Math.random() * gridOptions.gridRows)
        }
    }
}