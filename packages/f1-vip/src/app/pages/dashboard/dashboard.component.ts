import { Component, OnInit } from '@angular/core';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from '../../../environments/environment';
import { User } from '../../types/user';

@Component({
	selector: 'mk-email-campaign-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	showPanel = 'subscription';

	user: User = {
		email: '',
		firstname: '',
		lastname: '',
	};
    
	async ngOnInit(): Promise<void> {
		const token = localStorage.getItem('token');

		if (!token) {
			return;
		}

		this.user.email = JSON.parse(token).email;


		const userCampaign = new UserCampaignDataModelModule();
    
		const user = await userCampaign.getUser(this.user.email, environment.campaignKey);

		if (user && user.length > 0) {
			const userDetails = JSON.parse(user[0].D);

			this.user.firstname = userDetails.firstname;
			this.user.lastname = userDetails.lastname;
			this.user.expiry = user[0].expiry;
		}
	}
}
