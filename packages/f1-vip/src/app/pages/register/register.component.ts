import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'mk-email-campaign-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	title = 'Register'
    
	user = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		passwordConfirm: '',
		toc: false,
	}
    
	constructor(private router: Router) {}
    
	async onSave() {
		if (!this.user.toc) {
			alert('You must agree to the terms and conditions to proceed');
			return;
		}
        
		if (this.user.password !== this.user.passwordConfirm) {
			alert('Passwords do not match');
			return;
		}
        
		// TODO email validation
        
		const userDataModel = new UserCampaignDataModelModule();
        
		const registered = await userDataModel.saveUser(this.user.email, environment.campaignKey, {
			firstname: this.user.firstname,
			lastname: this.user.lastname,
		}, this.user.password);
        

		if (!registered) {
			alert('Error registering. Please try again later');
		}

		// TODO JWT
		localStorage.setItem('token', JSON.stringify({
			email: this.user.email,
		}));
        
		this.router.navigateByUrl('dashboard');
	}
}
