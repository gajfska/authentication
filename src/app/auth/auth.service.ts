import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
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

    constructor(private router: Router) {
    }

    db = null;
    currentUserName?: string;
    loggedUser?: UserInterface;



    createDB() {
        const request = indexedDB.open('accounts');

        request.onupgradeneeded = event => {
            this.db = request.result;
            const pNotes = this.db.createObjectStore('personal_data', {keyPath: 'email'});
            alert('Upgrate');
        };

        request.onsuccess = event => {
            this.db = request.result;
            alert('sucess');
        };
    }

    // register(user: UserInterface) {
    //     const tx = this.db.transaction(['personal_data'], 'readwrite');
    //     const pNotes = tx.objectStore('personal_data');
    //     pNotes.add(user);
    // }


    register(user: UserInterface): Promise<boolean> {
        return this.doesUserExists(user)
            .then(userExists => {
                if (userExists) {
                    throw new LoginError(LoginErrorType.accountAlreadyExists, null);
                }
                return true;
            })
            .then(() => {
                const tx = this.db.transaction(['personal_data'], 'readwrite');
                const pNotes = tx.objectStore('personal_data');
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
        const tx = this.db.transaction(['personal_data'], 'readonly');
        const pNotes = tx.objectStore('personal_data');
        const request = pNotes.get(user.email);

        return new Promise((resolve) => {
            request.onsuccess = () => {
                resolve(request.result !== undefined);
            };
        });
    }


    verifyPassword(email: string, passwordHash: string): Promise<boolean> {
        const tx = this.db.transaction(['personal_data'], 'readonly');
        const pNotes = tx.objectStore('personal_data');
        // const request = pNotes.get(user.email);
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


