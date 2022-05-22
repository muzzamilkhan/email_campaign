import { Component, Input } from '@angular/core';
import { UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../types/user';

@Component({
	selector: 'mk-email-campaign-subsriptions',
	templateUrl: './subsriptions.component.html',
	styleUrls: ['./subsriptions.component.scss'],
})
export class SubsriptionsComponent {
    @Input() user!: User;

    async unsubscribe(){
    	const userDataModel = new UserCampaignDataModelModule();
        
    	const update = await userDataModel.updateUser(
    		this.user.email, 
    		environment.campaignKey,
    		undefined,
    		undefined,
    		1
    	);
    	if (update) {
    		this.user.expiry = 1;
    		alert('Unsubscribed successfully');
    	} else {
    		alert('Error unsubscribing. Trying again later');
    	}
    }

    async resubscribe(){
    	const userDataModel = new UserCampaignDataModelModule();
        
    	const update = await userDataModel.updateUser(
    		this.user.email, 
    		environment.campaignKey,
    		undefined,
    		undefined,
    		0
    	);

    	if (update) {
    		this.user.expiry = 0;
    		alert('Resubscribed successfully');
    	} else {
    		alert('Error resubscribing. Trying again later');
    	}
    }
}
