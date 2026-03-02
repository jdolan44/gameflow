import { InputHandler } from "./InputHandler.js";
export class GameObject {

    gameState; //object representing the game state.
    whoseMove; //integer representing which player's turn it is.

    constructor() {
        if (this.constructor == GameObject) {
            throw new Error("GameObject is abstract and cannot be instantiated directly!");
        }
        if (this.init == undefined) {
            throw new Error("init() must be defined!");
        }
        if (this.takeTurn == undefined) {
            throw new Error("takeTurn() must be defined!");
        }
        if (this.isValidTurn == undefined) {
            throw new Error("isValidTurn() must be defined!");
        }
        if (this.checkWinner == undefined) {
            throw new Error("checkWinner() must be defined!");
        }
        this.init();
    }

    nextPlayer() {
        if (this.whoseMove == 1) this.whoseMove = 2;
        else this.whoseMove = 1;
    }

}