import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LoginError, LoginErrorType} from "../login-error";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor( private authService: AuthService,
                 private router: Router) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        console.log(form.value);
        this.authService.login(form.value).then(() => {
            form.reset();
            this.router.navigate(['welcome']);
        })
            .catch((err: LoginError) => {
                switch (err.errorType) {
                    case LoginErrorType.wrongPassword:
                        alert('Wrong password!');
                        break;
                    case LoginErrorType.accountDoesntExist:
                        alert('Account for this email address does not exist :( ');
                        break;
                    default:
                        alert('Something went wrong :(');
                        break;
                }
            });
    }

}