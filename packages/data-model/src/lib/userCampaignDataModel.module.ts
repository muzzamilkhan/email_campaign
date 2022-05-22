import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModelBase } from './dataModelBase';
import { DynamoDBTables } from '@mk-email-campaign/dynamo-store';
import * as bcrypt from 'bcryptjs';

@NgModule({
	imports: [
		CommonModule,
	],
})
export class UserCampaignDataModelModule extends DataModelBase {
	constructor() {
		super(DynamoDBTables.users);
	}
    
	public async getAllUsers(campaign: string): Promise<any[] | undefined>{
		const records = await this.getRecord({
			ExpressionAttributeValues: {
				":C": campaign,
			},
			KeyConditionExpression: "campaign = :C",
		});
        
		if (records.Count > 0) {
			return records.Items;
		} 
        
		return;
	}

	public async getUser(email: string, campaign: string): Promise<any[] | undefined>{
		const records = await this.getRecord({
			ExpressionAttributeValues: {
				":E": email,
				":C": campaign,
			},
			KeyConditionExpression: "email = :E and campaign = :C",
		});
        
		if (records.Count > 0) {
			return records.Items;
		} 
        
		return;
	}
    
	public async saveUser(
		email: string, 
		campaign: string, 
		data: any, 
		password: string
	) {
		const save = await this.saveRecord({
			Item: {
				"email": {
					S: email,
				},
				"campaign": {
					S: campaign,
				},
				"D": {
					S: JSON.stringify(data),
				},
				"password_hash": {
					S: this.hashPassword(password),
				},
				"expiry": {
					N: 0,
				},
				"registered_timestamp": {
					N: new Date().getTime(),
				},
			},
		});
        
		return save.$metadata.httpStatusCode === 200;
	}

	public async deleteUser(
		email: string,
		campaign: string,
	) {
        
		const deleteUser = await this.deleteRecord({
			Key: {
				"email": {
					S: email,
				},
				"campaign": {
					S: campaign,
				},
			},
		});
        
		return deleteUser.$metadata.httpStatusCode === 200;
	}
    
	public async updateUser(email: string, campaign: string, data?: any, password?: string, expiry?: number) {
		const user = await this.getUser(email, campaign);
        
		if (!user || user.length === 0) {
			return false;
		}

		if (data === undefined) {
			data = JSON.parse(user[0].D);
		}

		if (password === undefined) {
			password = user[0].password_hash as string;
		} else {
			password = this.hashPassword(password);
		}

		if (expiry === undefined) {
			expiry = user[0].expiry;
		}
        
		const save = await this.saveRecord({
			Item: {
				"email": {
					S: email,
				},
				"campaign": {
					S: campaign,
				},
				"D": {
					S: JSON.stringify(data),
				},
				"password_hash": {
					S: password,
				},
				"expiry": {
					N: expiry,
				},
				"registered_timestamp": {
					N: user[0].registered_timestamp,
				},
			},
		});
        
		return save.$metadata.httpStatusCode === 200;
        
	}
    
	public async authUser(email: string, campaign: string, password: string) {
		const user = await this.getUser(email, campaign);
        
        
		if (!user || user.length === 0) {
			return false;
		}
        
		return await bcrypt.compare(password, user[0].password_hash);
	}
    
	private hashPassword(password: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}
}
