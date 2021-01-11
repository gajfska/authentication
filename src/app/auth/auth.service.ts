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

    register(user: UserInterface) {
        const tx = this.db.transaction(['personal_data'], 'readwrite');
        const pNotes = tx.objectStore('personal_data');
        pNotes.add(user);
    }

}


