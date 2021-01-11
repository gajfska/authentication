import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    constructor( private authService: AuthService) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.authService.register(form.value);

        console.log(form.value);

        form.reset();
    }

}