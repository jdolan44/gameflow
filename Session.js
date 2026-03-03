export class Session {
    game; //GameObject instance
    inputHandler; //InputHandler instance
    players;

    constructor(player1, player2, game, inputHandler) {
        this.players = [player1, player2];
        this.inputHandler = inputHandler;
        this.game = game;
    }

    async runGame() {
        let winner = null;
        do {
            this.game.nextPlayer();
            let move = await this.getMove();
            this.game.takeTurn(move);
            winner = this.game.checkWinner();
        } while (!winner);
        this.inputHandler.emitGameOver(this.game.whoseMove);
        console.log(`game ended between ${this.players[0]} and ${this.players[1]}.`);
    }

    async getMove() {
        let move = null;
        let currentPlayerId = this.players[this.game.whoseMove - 1];
        do {
            //how does the user get feedback on invalid turn?
            move = await this.inputHandler.requestMove(currentPlayerId, this.game.whoseMove); //ugly!
        } while (!this.game.isValidTurn(move));
        return move;
    }
}