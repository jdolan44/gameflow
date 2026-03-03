export class InputHandler {
    constructor() {
        if (this.constructor == InputHandler) {
            throw new Error("InputHandler is abstract and cannot be instantiated directly!");
        }
        if (this.requestMove == undefined) {
            //requestMove() should have params: playerID and status
            throw new Error("requestMove() must be defined!");
        }
    }
}