export class InputHandler {
    constructor() {
        if (this.constructor == InputHandler) {
            throw new Error("InputHandler is abstract and cannot be instantiated directly!");
        }
        if (this.requestMove == undefined) {
            throw new Error("requestMove() must be defined!");
        }
    }

    requestMove(playerNumber) {
        console.log(`it's player ${playerNumber}'s turn.`);
        let move = prompt("what is your move? ");
        return move;
    }
}