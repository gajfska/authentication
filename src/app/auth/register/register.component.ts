import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService, UserInterface} from "../auth.service";
import {Router} from "@angular/router";
import md5 from 'md5';
import {LoginError, LoginErrorType} from "../login-error";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    alertAccountAlreadyExists = false;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        let user: UserInterface = form.value;
        user.password = md5(user.password);
        this.authService.register(form.value)
            .then(() => {
                form.reset();
                this.router.navigate(['login']);
            })
            .catch((err: LoginError) => {
                switch (err.errorType) {
                    case LoginErrorType.accountAlreadyExists:
                        this.alertAccountAlreadyExists = true;
                        break;
                    default:
                        alert('Something went wrong :(');
                        break;
                }
            });

    }

}