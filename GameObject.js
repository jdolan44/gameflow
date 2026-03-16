//potential future change: use proxy for game state so that pass by value isn't an issue
export class GameObject {

    gameState; //object representing the game state.
    whoseMove; //integer representing which player's turn it is.

    constructor() {
        if (this.constructor == GameObject) {
            throw new Error("GameObject is abstract and cannot be instantiated directly!");
        }
        if (this.initialState == undefined) {
            throw new Error("initialState() must be defined!");
        }
        if (this.takeTurn == undefined) {
            throw new Error("takeTurn(move, gameState) must be defined!");
        }
        if (this.isValidTurn == undefined) {
            throw new Error("isValidTurn(move, gameState) must be defined!");
        }
        if (this.checkWinner == undefined) {
            throw new Error("checkWinner(gameState) must be defined!");
        }
        this.gameState = this.initialState();
    }

    async run(requestMove, onGameOver) {
        let winner = null;
        do {
            this.nextPlayer();
            let move = await this.getMove(requestMove);
            this.takeTurn(move, this.gameState);
            winner = this.checkWinner(this.gameState); //what if it's a draw?
        } while (!winner);
        onGameOver(this.whoseMove, this.gameState);
    }

    async getMove(requestMove) {
        let move = null;
        do {
            move = await requestMove(this.whoseMove, this.gameState);
            console.log(move); //for debugging
        } while (!this.isValidTurn(move, this.gameState));
        return move;
    }

    nextPlayer() {
        if (this.whoseMove == 1) this.whoseMove = 2;
        else this.whoseMove = 1;
    }

}