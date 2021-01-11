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

    login(user: UserInterface) {

        const tx = this.db.transaction(['personal_data'], 'readonly');
        const pNotes = tx.objectStore('personal_data');
        const request = pNotes.get(user.email);

        request.onsuccess = event => {
            if (md5(user.password) === request.result.password) {
                console.log("success");
                console.log(request.result.firstName);
                this.currentUserName = request.result.firstName;
                this.router.navigate(['home']);

            } else {
                console.log("wrong password should be " + request.result.password);
            }
        };

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
}


