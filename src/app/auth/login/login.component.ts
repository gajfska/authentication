import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        console.log(form.value);

        form.reset();
    }

}