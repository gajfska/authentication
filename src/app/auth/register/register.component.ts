import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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

        console.log(form.value);

        this.authService.register(form.value);
        form.reset();
        this.router.navigate(['../login'], { relativeTo: this.route.parent });

    }

}