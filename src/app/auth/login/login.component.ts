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
    alertAccountdoesntexist = false;

    constructor( private authService: AuthService,
                 private router: Router) {}

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
                        // alert('Wrong password!');
                        break;
                    case LoginErrorType.accountDoesntExist:
                        this.alertAccountdoesntexist = true;
                        // alert('Account for this email address does not exist :( ');
                        break;
                    default:
                        alert('Something went wrong :(');
                        break;
                }
            });

        this.alertWrongPassword = false;
        this.alertAccountdoesntexist = false;
    }

}