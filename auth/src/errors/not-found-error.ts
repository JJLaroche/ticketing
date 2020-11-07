import { CustomError } from "./custom-error";

export class NotFounError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFounError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [
            { message: 'Not found' }
        ];
    }
}