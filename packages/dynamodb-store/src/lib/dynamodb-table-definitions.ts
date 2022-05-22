import { DynamoDBTables } from "./dynamodb-store.module";

export const tableDefinitions: {[key in DynamoDBTables]: any} = {
	campaigns: {
        
		AttributeDefinitions: [
			{
				AttributeName: "campaign", 
				AttributeType: "S"
			}, 
		], 
		KeySchema: [
			{
				AttributeName: "campaign", 
				KeyType: "HASH"
			}, 
		], 
		ProvisionedThroughput: {
			ReadCapacityUnits: 5, 
			WriteCapacityUnits: 5
		}, 
		TableName: 'campaigns',
	},
	users: {
        
		AttributeDefinitions: [
			{
				AttributeName: "email", 
				AttributeType: "S"
			},
			{
				AttributeName: "campaign", 
				AttributeType: "S"
			},
		], 
		KeySchema: [
			{
				AttributeName: "email", 
				KeyType: "HASH"
			}, 
			{
				AttributeName: "campaign", 
				KeyType: "RANGE"
			}, 
		], 
		ProvisionedThroughput: {
			ReadCapacityUnits: 5, 
			WriteCapacityUnits: 5
		}, 
		TableName: 'userCampaign',
	},
	admin: {
        
		AttributeDefinitions: [
			{
				AttributeName: "email", 
				AttributeType: "S"
			},
		], 
		KeySchema: [
			{
				AttributeName: "email", 
				KeyType: "HASH"
			},
		], 
		ProvisionedThroughput: {
			ReadCapacityUnits: 5, 
			WriteCapacityUnits: 5
		}, 
		TableName: 'admin',
	}
};