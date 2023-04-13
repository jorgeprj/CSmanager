export class InvalidIdException extends Error {
    constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, InvalidIdException.prototype);
    }
 }