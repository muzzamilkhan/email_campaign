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
export class UserDataModelModule extends DataModelBase {
    constructor() {
        super(DynamoDBTables.users);
    }
    
    private getUserKey(email: string): string {
        return `${email}`;
    }
    public async getUser(email: string){
        return await this.getRecord({
            ExpressionAttributeValues: {
                ":p": this.getUserKey(email),
                ":s": 1,
            },
            KeyConditionExpression: "PK = :p and SK > :s",
        });
    }
    
    public async saveUser(email: string, data: any, password: string) {
        return await this.saveRecord({
            Item: {
                "PK": {
                    S: this.getUserKey(email),
                },
                "D": {
                    S: JSON.stringify(data),
                },
                "password_hash": {
                    S: this.hashPassword(password),
                }
            },
        });
    }
    
    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
        
    }
}
