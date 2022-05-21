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
    
    private getUserCampaignKey(userId: string, campaign: string): string {
        return `${userId}|${campaign}`;
    }
    public async getUserCampaign(userId: string, campaign: string){
        return await this.getRecord({
            ExpressionAttributeValues: {
                ":p": this.getUserCampaignKey(userId, campaign),
                ":s": 1,
            },
            KeyConditionExpression: "PK = :p and SK > :s",
        });
    }
    
    public async saveUserCampaign(userId: string, campaign: string, data: any, expiry: number = 0) {
        return await this.saveRecord({
            Item: {
                "PK": {
                    S: this.getUserCampaignKey(userId, campaign),
                }, 
                "SK": {
                    N: expiry?.toString() || '0',
                },
                "D": {
                    S: JSON.stringify(data)
                },
            },
        });
    }
    
    
}
