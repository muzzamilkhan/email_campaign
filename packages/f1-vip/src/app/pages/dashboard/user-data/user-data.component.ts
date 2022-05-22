import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../types/user';

@Component({
	selector: 'mk-email-campaign-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent {
    @Input() user!: User;

    constructor(private router: Router) {}

    async deleteData(){
    	const userDataModel = new UserCampaignDataModelModule();
        
    	const deleteUser = await userDataModel.deleteUser(this.user.email, environment.campaignKey);
    	if (deleteUser) {
    		this.user.expiry = 1;
    		alert('User data deleted successfully');

    		this.router.navigate(['logout']);
    	} else {
    		alert('Error deleting data. Trying again later');
    	}
    }
}
