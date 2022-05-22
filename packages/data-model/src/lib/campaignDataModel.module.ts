import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModelBase } from './dataModelBase';
import { DynamoDBTables } from '@mk-email-campaign/dynamo-store';

@NgModule({
	imports: [
		CommonModule,
	],
})
export class CampaignDataModelModule extends DataModelBase {
	constructor() {
		super(DynamoDBTables.campaigns);
	}

    
	public async getCampaign(campaign: string){
		// TODO change to getItem command
		return await this.getRecord({
			ExpressionAttributeValues: {
				":C": campaign,
			},
			KeyConditionExpression: "campaign = :C",
		});
	}

	public async getAllCampaigns(){
		// TODO change to getItem command
		return await this.scan();
	}
    
	public async saveCampaign(campaign: string, data: any) {
		return await this.saveRecord({
			Item: {
				"campaign": {
					S: campaign,
				},
				"D": {
					S: JSON.stringify(data)
				},
				"expiry": {
					N: 0, 
				}
			},
		});
	}
    
	public async updateCampaign(campaign: string, data?: any, expiry?: number) {
		const before = await this.getCampaign(campaign);

		if (data === undefined) {
			data = before.Items[0].D
		} else {
			data = JSON.stringify(data);
		}

		if (expiry === undefined) {
			expiry = before.Items[0].expiry;
		}

		const save = await this.saveRecord({
			Item: {
				"campaign": {
					S: campaign,
				},
				"D": {
					S: data
				},
				"expiry": {
					N: expiry, 
				}
			},
		});

		return save.$metadata.httpStatusCode === 200;
	}
}
