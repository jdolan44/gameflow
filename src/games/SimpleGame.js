import { GameObject } from "../core/GameObject.js";

export class SimpleGame extends GameObject {
    initialState() { return {} }
    /**@override */
    isValidTurn(move, gameState) {
        return move == "i want to win" || move == "pass";
    }
    takeTurn(move, gameState) {
        if (move == "i want to win") { gameState.winner = true; }
    }
    checkGameOver(gameState) {
        return gameState.winner ? { type: 'winner', winner: this.whoseMove } : null;
    }
}