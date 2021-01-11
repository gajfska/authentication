import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService, UserInterface} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import md5 from 'md5';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    constructor( private authService: AuthService,
                 private router: Router,
                 private route: ActivatedRoute) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        let user: UserInterface = form.value;
        user.password = md5(user.password);
        this.authService.register(form.value);
        form.reset();
        this.router.navigate(['auth/login']);

    }

}