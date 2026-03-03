import { io } from "socket.io-client";
import promptSync from 'prompt-sync';
const prompt = promptSync();

const socket = io("http://localhost:3000");

console.log("connected!");
socket.on("request_move", (status, callback) => {
    console.log(`it's player ${status}'s turn.`);
    let move = prompt("what is your move? ");
    //socket.emit("move", move);
    callback({
        move: move
    })
});

socket.on("game_over", (status) => {
    console.log(`player ${status} wins!`);
    socket.disconnect();
});