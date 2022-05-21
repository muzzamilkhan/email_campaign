import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const CAMPAIGN_KEY = '4aac604c-5d45-5921-90ea-7c81e806a4b6';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
    declarations: [AppComponent, RegisterComponent, WelcomeComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
