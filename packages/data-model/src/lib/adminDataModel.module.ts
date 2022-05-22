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
export class AdminDataModelModule extends DataModelBase {
	constructor() {
		super(DynamoDBTables.admin);
	}
    
	public async getUser(email: string): Promise<any[] | undefined>{
		const records = await this.getRecord({
			ExpressionAttributeValues: {
				":E": email,
			},
			KeyConditionExpression: "email = :E",
		});
        
		if (records.Count > 0) {
			return records.Items;
		} 
        
		return;
	}
    
	public async saveUser(
		email: string, 
		data: any, 
		password: string
	) {
		const save = await this.saveRecord({
			Item: {
				"email": {
					S: email,
				},
				"D": {
					S: JSON.stringify(data),
				},
				"password_hash": {
					S: this.hashPassword(password),
				},
			},
		});
        
		return save.$metadata.httpStatusCode === 200;
	}
    
	public async updateUser(email: string, data?: any, password?: string) {
		const user = await this.getUser(email);
        
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
        
		const save = await this.saveRecord({
			Item: {
				"email": {
					S: email,
				},
				"D": {
					S: JSON.stringify(data),
				},
				"password_hash": {
					S: password,
				},
			},
		});
        
		return save.$metadata.httpStatusCode === 200;
        
	}
    
	public async authUser(email: string, password: string) {
		const user = await this.getUser(email);
        
        
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
