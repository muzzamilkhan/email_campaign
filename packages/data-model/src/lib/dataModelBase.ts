import { QueryCommandInput, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { DynamodbStoreModule, DynamoDBTables } from '@mk-email-campaign/dynamo-store';


export abstract class DataModelBase {
    private dynamoDBStore;
    
    constructor(dynamoTable: DynamoDBTables) {
        this.dynamoDBStore = new DynamodbStoreModule(dynamoTable);
    }
    
    protected async getRecord(input: Omit<QueryCommandInput, 'TableName'>): Promise<any> {
        return await this.dynamoDBStore.getRecord(input);
    }
    
    protected async saveRecord(input: Omit<PutCommandInput, 'TableName'>): Promise<any> {
        console.log('input', input);
        return await this.dynamoDBStore.saveRecord(input);
    }
}