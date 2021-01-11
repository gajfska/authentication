import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

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

    register(user: UserInterface) {
        const tx = this.db.transaction(['personal_data'], 'readwrite');
        const pNotes = tx.objectStore('personal_data');
        pNotes.add(user);
    }

    login(user: UserInterface) {

        const tx = this.db.transaction(['personal_data'], 'readonly');
        const pNotes = tx.objectStore('personal_data');
        const request = pNotes.get(user.email);

        request.onsuccess = event => {
            if (user.password === request.result.password) {
                console.log("success");
            } else {
                console.log("wrong password should be " + request.result.password);
            }
        };

    }
}


