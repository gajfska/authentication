import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {CatService} from "./cat.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    firstName: string;

    constructor(private authService: AuthService,
                public catService: CatService){
        this.firstName = authService.loggedUser.firstName;
    }

    ngOnInit() {
        this.catService.getData();

    }

    refreshCat(){
        this.catService.getData();
    }

}
