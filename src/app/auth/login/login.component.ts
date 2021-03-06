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

    alertWrongPassword = false;
    alertAccountDoesntExist = false;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this.authService.login(form.value).then(() => {
            form.reset();
            this.router.navigate(['home']);
        })
            .catch((err: LoginError) => {
                switch (err.errorType) {
                    case LoginErrorType.wrongPassword:
                        this.alertWrongPassword = true;
                        break;
                    case LoginErrorType.accountDoesntExist:
                        this.alertAccountDoesntExist = true;
                        break;
                    default:
                        alert('Something went wrong :(');
                        break;
                }
            });
    }

}