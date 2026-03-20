import { InputHandler } from "./InputHandler.js";

export class SocketInputHandler extends InputHandler {
    socket;

    constructor(socket) {
        super();
        this.socket = socket;
    }

    async requestMove(status, gameState) {
        this.socket.emit('request_move', status, gameState);
        return new Promise((resolve) => {
            this.socket.on("take_turn", (move) => {
                resolve(move);
            });
        });
    }

    emitGameOver(status, gameState) {
        this.socket.emit("game_over", status, gameState);
    }
}