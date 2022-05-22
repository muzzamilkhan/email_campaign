import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from 'packages/f1-vip/src/environments/environment';

@Component({
    selector: 'mk-email-campaign-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private router: Router) {}
    user = {
        email: '',
        password: '',
    }
    
    async login() {
        const userModel = new UserCampaignDataModelModule();
        
        const isAuthenticated = await userModel.authUser(this.user.email, environment.campaignKey, this.user.password);
        
        if (isAuthenticated) {
            // TODO JWT
            localStorage.setItem('token', JSON.stringify({
                email: this.user.email,
            }));
            
            this.router.navigateByUrl('welcome');
        } else {
            alert('Incorrect username/password');
        }
    }
}
