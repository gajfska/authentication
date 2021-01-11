import {Injectable} from "@angular/core";
import md5 from 'md5';
import {LoginError, LoginErrorType} from "./login-error";


export interface UserInterface {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    db = null;
    loggedUser?: UserInterface;
    private databaseName = 'accounts';
    private collectionName = 'personal_data';

    constructor() {
        this.createDatabase();
    }

    createDatabase() {
        const request = indexedDB.open(this.databaseName);
        request.onupgradeneeded = () => {
            this.db = request.result;
            this.db.createObjectStore(this.collectionName, {keyPath: 'email'});
        };
        request.onsuccess = () => {
            this.db = request.result;
        };
    }


    register(user: UserInterface): Promise<boolean> {
        return this.doesUserExists(user)
            .then(userExists => {
                if (userExists) {
                    throw new LoginError(LoginErrorType.accountAlreadyExists, null);
                }
                return true;
            })
            .then(() => {
                const tx = this.db.transaction([this.collectionName], 'readwrite');
                const pNotes = tx.objectStore(this.collectionName);
                pNotes.add(user);
                return true;
            });
    }

    login(user: UserInterface): Promise<boolean> {
        return this.doesUserExists(user)
            .then(userExists => {
                if (!userExists) {
                    throw new LoginError(LoginErrorType.accountDoesntExist, null);
                }
                return true;
            })
            .then(() => {
                const passwordHash = md5(user.password);
                return this.verifyPassword(user.email, passwordHash);
            });
    }


    doesUserExists(user: UserInterface): Promise<boolean> {
        const tx = this.db.transaction([this.collectionName], 'readonly');
        const pNotes = tx.objectStore(this.collectionName);
        const request = pNotes.get(user.email);

        return new Promise((resolve) => {
            request.onsuccess = () => {
                resolve(request.result !== undefined);
            };
        });
    }


    verifyPassword(email: string, passwordHash: string): Promise<boolean> {
        const tx = this.db.transaction([this.collectionName], 'readonly');
        const pNotes = tx.objectStore(this.collectionName);
        const request = pNotes.get(email);

        return new Promise((resolve, reject) => {
            request.onsuccess = event => {
                if (passwordHash === request.result.password) {
                    this.loggedUser = request.result;
                    resolve(request.result);
                } else {
                    reject(new LoginError(LoginErrorType.wrongPassword, null));
                }
            };
        });
    }
}


