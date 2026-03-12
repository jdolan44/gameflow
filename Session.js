export class Session {
    game; //GameObject instance
    playerInputHandlers; //array of each player's input handlers.

    constructor(player1Handler, player2Handler, game) {
        this.playerInputHandlers = [player1Handler, player2Handler];
        this.game = game;
    }

    async runGame() {
        this.game.run(
            // callback that asks the correct handler for a move
            (player, state) =>
                this.playerInputHandlers[player - 1].requestMove(player, state),

            // optional notification for all handlers
            (winner, state) =>
                this.playerInputHandlers.forEach(h => h.emitGameOver(winner, state))
        );
    }
}