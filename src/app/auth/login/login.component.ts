import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor( private authService: AuthService) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        console.log(form.value);
        this.authService.login(form.value);
        form.reset();
    }

}