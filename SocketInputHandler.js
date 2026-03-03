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
            this.io.to(playerId).emit('request_move', status);

            const socket = this.io.sockets.sockets.get(playerId);
            if (!socket) return resolve(null); // or handle error

            // Wait for exactly one move response from this socket
            socket.once('move', (move) => {
                console.log("recieved!");
                resolve(move);
            });
        });
    }

    emitGameOver(status) {
        this.io.emit("game_over", status);
    }
}