import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const CAMPAIGN_KEY = '4aac604c-5d45-5921-90ea-7c81e806a4b6';

const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },
];

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        WelcomeComponent,
        LoginComponent,
        LogoutComponent,
    ],
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
    exports: [RouterModule],
    providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
