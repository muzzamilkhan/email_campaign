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

    public async authUser(email: string, campaign: string, password: string) {
        const user = await this.getUser(email, campaign);


        if (!user || user.length === 0) {
            return false;
        }

        const auth = await bcrypt.compare(password, user[0].password_hash);

        return (auth);
    }
    
    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
        
    }
}
