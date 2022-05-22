import { Component, OnInit } from '@angular/core';
import { CampaignDataModelModule, UserCampaignDataModelModule } from '@mk-email-campaign/data-model';
import { saveAs } from 'file-saver';
import * as Chance from 'chance';

@Component({
	selector: 'mk-email-campaign-campaigns',
	templateUrl: './campaigns.component.html',
	styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
	campaigns: any[] = [];
  
	async ngOnInit(): Promise<void> {
		await this.getCampaigns();

	}

	async getCampaigns() {
		const campaignModel =  new CampaignDataModelModule();
    
		const getCampaigns = await campaignModel.getAllCampaigns();

		this.campaigns = [];

		for (const campaign of getCampaigns.Items) {
			const campaignData = JSON.parse(campaign.D.S);
			this.campaigns.push({
				key: campaign.campaign.S,
				name: campaignData.name,
				expiry: parseInt(campaign.expiry.N),
			});
		}

		this.campaigns.sort((a, b) => {
			return a.expiry - b.expiry;
		});
	}

	async deactivateCampaign(campaignKey: string) {
		const campaignModel =  new CampaignDataModelModule();

		const saved = await campaignModel.updateCampaign(campaignKey, undefined, 1);

		if (saved) {
			this.getCampaigns();
			alert('Campaign successfully deactivated');
		} else {
      
			alert('Error deactivating campaign. Try again later');
		}
	}

	async reactivateCampaign(campaignKey: string) {
		const campaignModel =  new CampaignDataModelModule();

		const saved = await campaignModel.updateCampaign(campaignKey, undefined, 0);

		if (saved) {
			this.getCampaigns();
			alert('Campaign successfully reactivated');
		} else {
      
			alert('Error reactivating campaign. Try again later');
		}
	}

	async getEmailList(campaignKey: string) {
		const userCampaignModel = new UserCampaignDataModelModule();
		const campaignModel =  new CampaignDataModelModule();

		const campaign = await campaignModel.getCampaign(campaignKey);

		const data = await userCampaignModel.getAllUsers(campaignKey);

		if (!campaign || !data) {
			alert('Error getting user list');
			return;
		}

		const campaignData = JSON.parse(campaign.Items[0].D)

		const activeUsers = data
			.filter((u) => u.expiry === 0)
			.map((u) => {
				const userdata = JSON.parse(u.D);

				return {
					email: u.email,
					firstname: userdata.firstname,
					lastname: userdata.lastname,
				}
		  });
		this.downloadFile(activeUsers, campaignData.name);
	}

	downloadFile(data: any, fileName: string) {
		const replacer = (key: any, value: any) => value === null ? '' : value; // specify how you want to handle null values here
		const header = Object.keys(data[0]);
		const csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
		csv.unshift(header.join(','));
		const csvArray = csv.join('\r\n');

		const blob = new Blob([csvArray], {type: 'text/csv' })
		saveAs(blob, `${fileName}.csv`);
	}
}
