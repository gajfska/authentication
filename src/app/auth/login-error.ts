export enum LoginErrorType {
    accountDoesntExist,
    wrongPassword,
    accountAlreadyExists
}

export class LoginError extends Error {

    errorType: LoginErrorType;

    constructor(errorType: LoginErrorType, message?: string) {
        super(message);
        this.errorType = errorType;
    }
}