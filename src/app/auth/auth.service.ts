import {Injectable} from "@angular/core";
import md5 from 'md5';
import {LoginError, LoginErrorType} from "./login-error";
import {User} from "./user.model";

@Injectable({providedIn: 'root'})
export class AuthService {

    loggedUser?: User;
    private idbDatabase?: IDBDatabase;
    private databaseName = 'accounts';
    private collectionName = 'personal_data';

    constructor() {
        this.createDatabase();
    }

    private createDatabase(): void {
        const request = indexedDB.open(this.databaseName);
        request.onupgradeneeded = () => {
            this.idbDatabase = request.result;
            this.idbDatabase.createObjectStore(this.collectionName, {keyPath: 'email'});
        };
        request.onsuccess = () => {
            this.idbDatabase = request.result;
        };
    }


    register(user: User): Promise<boolean> {
        return this.doesUserExists(user)
            .then(userExists => {
                if (userExists) {
                    throw new LoginError(LoginErrorType.accountAlreadyExists, null);
                }
                return true;
            })
            .then(() => {
                const tx = this.idbDatabase.transaction([this.collectionName], 'readwrite');
                const pNotes = tx.objectStore(this.collectionName);
                pNotes.add(user);
                return true;
            });
    }

    login(user: User): Promise<boolean> {
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


    private doesUserExists(user: User): Promise<boolean> {
        const tx = this.idbDatabase.transaction([this.collectionName], 'readonly');
        const pNotes = tx.objectStore(this.collectionName);
        const request = pNotes.get(user.email);

        return new Promise((resolve) => {
            request.onsuccess = () => {
                resolve(request.result !== undefined);
            };
        });
    }


    private verifyPassword(email: string, passwordHash: string): Promise<boolean> {
        const tx = this.idbDatabase.transaction([this.collectionName], 'readonly');
        const pNotes = tx.objectStore(this.collectionName);
        const request = pNotes.get(email);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
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


