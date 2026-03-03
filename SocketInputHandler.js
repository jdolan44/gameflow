import { InputHandler } from "./InputHandler.js";

export class SocketInputHandler extends InputHandler {
    io;

    constructor(io) {
        super();
        this.io = io;
    }


    async requestMove(playerId, status) {
        return new Promise((resolve) => {
            // Tell the client to request input
            const socket = this.io.sockets.sockets.get(playerId);
            if (!socket) return resolve(null);

            socket.emit('request_move', status, (response) => {
                resolve(response.move);
            });
        });
    }

    emitGameOver(status) {
        this.io.emit("game_over", status);
    }
}