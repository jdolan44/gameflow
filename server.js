import { SimpleGame } from "./SimpleGame.js";
import { Session } from "./Session.js";
import { SocketInputHandler } from "./SocketInputHandler.js";
import { Server } from "socket.io";
const io = new Server(3000);
let waitingPlayer = null;
io.on("connection", (socket) => {
    console.log("player connected! " + socket.id);

    if (waitingPlayer) {
        let game = new SimpleGame();
        let handler = new SocketInputHandler(io);
        let session = new Session(waitingPlayer, socket.id, game, handler);
        session.runGame();
        waitingPlayer = null;
    }
    else {
        waitingPlayer = socket.id;
    }
});