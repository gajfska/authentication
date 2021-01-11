import {Injectable} from "@angular/core";

export interface UserInterface {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

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

}


