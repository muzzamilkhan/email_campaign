import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTableCommand, DeleteItemCommand, DeleteItemCommandInput, DeleteTableCommand, DescribeTableCommand, DynamoDB, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DeleteCommandInput, DynamoDBDocumentClient, PutCommandInput, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { tableDefinitions } from './dynamodb-table-definitions';

const marshallOptions = {
	convertEmptyValues: false, 
	removeUndefinedValues: false,
	convertClassInstanceToMap: false,
};

const unmarshallOptions = {
	wrapNumbers: false,
};

export enum DynamoDBTables {
    campaigns= 'campaigns',
    users= 'users',
}

const translateConfig = { marshallOptions, unmarshallOptions };
@NgModule({
	imports: [CommonModule],
})
export class DynamodbStoreModule {
	private dbClient: DynamoDB;
	private dynamoDBDocument: DynamoDBDocumentClient;
    
	constructor(private table: DynamoDBTables) {
		this.dbClient = new DynamoDB({
			endpoint: 'http://localhost:8000',
			region: 'local',
			credentials: {
				accessKeyId: "xxx",
				secretAccessKey: "yyy",
			},
		});
        
		this.dynamoDBDocument = DynamoDBDocumentClient.from(this.dbClient, translateConfig);
	}
    
	public async saveRecord(input: Omit<PutCommandInput, 'TableName'>): Promise<any> {
		await this.initTable();
        
		const params: PutCommandInput = {
			TableName: tableDefinitions[DynamoDBTables[this.table]].TableName,
			...input,
		};
        
		return await this.dynamoDBDocument.send(new PutItemCommand(params));
	}
    
	public async deleteRecord(input: Omit<DeleteItemCommandInput, 'TableName'>): Promise<any> {
		await this.initTable();
        
		const params: DeleteItemCommandInput = {
			TableName: tableDefinitions[DynamoDBTables[this.table]].TableName,
			...input,
		};
        
		return await this.dynamoDBDocument.send(new DeleteItemCommand(params));
	}
    
	public async getRecord(input: Omit<QueryCommandInput, 'TableName'>): Promise<any> {
		await this.initTable();
        
		const params: QueryCommandInput = {
			TableName: tableDefinitions[DynamoDBTables[this.table]].TableName,
			...input,
		};
        
		return await this.dynamoDBDocument.send(new QueryCommand(params));
	}
    
	public async initTable(): Promise<void> {
		try {
			await this.dbClient.send(new DescribeTableCommand({
				TableName: tableDefinitions[DynamoDBTables[this.table]].TableName,
			}))
		} catch(err: any) {
			console.log(`${tableDefinitions[DynamoDBTables[this.table]].TableName} table does not exist, creating...`);
			await this.createTable();
		}
	}
    
	private async createTable(): Promise<void> {
		await this.dbClient.send(new CreateTableCommand({
			...tableDefinitions[DynamoDBTables[this.table]],
		}));
	}
}