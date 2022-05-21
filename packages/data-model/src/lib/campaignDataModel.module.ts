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

    
    public async getUserCampaign(userId: string, campaign: string){
        // TODO change to getItem command
        return await this.getRecord({
            ExpressionAttributeValues: {
                ":C": campaign,
            },
            KeyConditionExpression: "campaign = :C",
        });
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
}
