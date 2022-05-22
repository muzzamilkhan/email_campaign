import { Component, OnInit } from '@angular/core';
import { AdminDataModelModule } from '@mk-email-campaign/data-model';
import { User } from '../../types/user';

@Component({
	selector: 'mk-email-campaign-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	showPanel = 'details';

	user: User = {
		email: '',
		firstname: '',
		lastname: '',
	};
    
	async ngOnInit(): Promise<void> {
		const token = localStorage.getItem('admin.token');

		if (!token) {
			return;
		}

		this.user.email = JSON.parse(token).email;


		const admin = new AdminDataModelModule();
    
		const user = await admin.getUser(this.user.email);

		if (user && user.length > 0) {
			const userDetails = JSON.parse(user[0].D);

			this.user.firstname = userDetails.firstname;
			this.user.lastname = userDetails.lastname;
		}
	}
}
