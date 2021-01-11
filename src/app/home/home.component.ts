import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    firstName: string;

    constructor(private authService: AuthService){
        this.firstName = authService.loggedUser.firstName;
    }

}