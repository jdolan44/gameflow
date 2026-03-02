import { InputHandler } from "./InputHandler.js";

export class SocketInputHandler extends InputHandler {
    socket;
    constructor(socket) {
        this.socket = socket;
    }
    requestMove(playerId) {
        return new Promise((resolve) => {
            // Tell the client to request input
            this.socket.emit('request_move', { playerId });

            // Wait for exactly one move response from this socket
            this.socket.once('move', (move) => {
                resolve(move);
            });
        });
    }
}