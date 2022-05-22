import { Component, Input } from '@angular/core';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../types/user';

@Component({
	selector: 'mk-email-campaign-userdetails',
	templateUrl: './userdetails.component.html',
	styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent {
    @Input() user!: User;

    password = '';
    passwordConfirm = '';

    async onSave() {
    	let updatePassword = false;
    	if (this.password != '' && this.password !== this.passwordConfirm) {
    		alert('Passwords do not match');
    		return;
    	}

    	if (this.password !== '') {
    		updatePassword = true;
    	}
        
    	const userDataModel = new UserCampaignDataModelModule();
        
    	const update = await userDataModel.updateUser(this.user.email, environment.campaignKey, {
    		firstName: this.user.firstname,
    		lastname: this.user.lastname,
    	}, updatePassword ? this.password : undefined);

    	if (update) {
    		this.password = '';
    		this.passwordConfirm = '';
    		alert('Details updated successfully');
    	} else {
    		alert('Error saving. Trying again later');
    	}
    }
}
