import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataModelModule } from '@mk-email-campaign/data-model';

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
		const userModel = new AdminDataModelModule();

		const isAuthenticated = await userModel.authUser(this.user.email, this.user.password);
        
		if (isAuthenticated) {
			// TODO JWT
			localStorage.setItem('admin.token', JSON.stringify({
				email: this.user.email,
			}));
            
			this.router.navigateByUrl('dashboard');
		} else {
			alert('Incorrect username/password');
		}
	}
}
