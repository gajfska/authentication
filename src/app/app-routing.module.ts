import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth/auth.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/auth/register', pathMatch: 'full' },
    {path: 'auth', component: AuthComponent, children: [
            { path: 'register', component: RegisterComponent},
            { path: 'login', component: LoginComponent}
        ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}