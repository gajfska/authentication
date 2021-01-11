import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/register', pathMatch: 'full' },
    // {path: 'auth', component: AuthComponent, children: [
    //         { path: 'register', component: RegisterComponent},
    //         { path: 'login', component: LoginComponent}
    //     ]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}