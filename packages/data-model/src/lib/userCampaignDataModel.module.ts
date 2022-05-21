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
    
    public async getUser(email: string, campaign: string){
        return await this.getRecord({
            ExpressionAttributeValues: {
                ":E": email,
                ":C": campaign,
                ":EXPIRY": 1,
            },
            KeyConditionExpression: "email = :E and campaign = :C and expiry > :EXPIRY",
        });
    }
    
    public async saveUser(email: string, campaign: string, data: any, password: string) {
        return await this.saveRecord({
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
                }
            },
        });
    }
    
    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
        
    }
}
