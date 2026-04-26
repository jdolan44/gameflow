//outline of the client contract. not for actual game use.

//required: import statement for the client.
import { Client } from "../core/gameflow-client.js";

//required: initialize the client
const client = new Client("http://localhost:0000");

//required: client joins a game
client.joinGame("dummy");

//optional: handles join status
client.onJoin((joinData) => {
    //handle joins here. "status" attribute will tell the status of the join.
    switch (joinData.status) {
        case "queued": console.log("in queue!"); break;
        case "begin": console.log("game begins!"); break;
    }
});

//required (or use below): handle state updates.
client.onStateUpdate((gameState) => {
    console.log("game state is : " + gameState);
});

//required (special case of above): handle my turn.
client.onMyTurn((gameState) => {
    console.log("it's my turn!");
    console.log(gameState);

    //required: take a turn.
    //this doesn't have to be triggered in "onMyTurn".
    //but calling it when it's not your turn will be rejected by the server.
    //move must be a valid move as well.
    let move = { turn: "pass" };
    client.takeTurn(move);
});

//optional (but recommended): handle invalid turns.
//internal behavior: an "onMyTurn" is re-triggered if the player sent an invalid move.
client.onInvalidTurn((message) => {
    console.log("invalid turn: " + message);
});

//required: handle game over scenarios.
client.onGameOver((outcome) => {
    console.log("game ended: " + outcome.reason);
    if (outcome.isWinner) console.log("you won!");

    //optional: disconnect the client.
    //can be called outside of onGameOver.
    //non-disconnected clients can re-join a game.
    client.disconnect();
});

//optional: client quits the game
client.quitGame();