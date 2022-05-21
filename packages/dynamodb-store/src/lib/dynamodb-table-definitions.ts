import { DynamoDBTables } from "./dynamodb-store.module";

export const tableDefinitions: {[key in DynamoDBTables]: any} = {
    campaigns: {
        
        AttributeDefinitions: [
            {
                AttributeName: "PK", 
                AttributeType: "S"
            }, 
            {
                AttributeName: "SK", 
                AttributeType: "N"
            },
        ], 
        KeySchema: [
            {
                AttributeName: "PK", 
                KeyType: "HASH"
            }, 
            {
                AttributeName: "SK", 
                KeyType: "RANGE"
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
                AttributeName: "PK", 
                AttributeType: "S"
            },
        ], 
        KeySchema: [
            {
                AttributeName: "PK", 
                KeyType: "HASH"
            },
        ], 
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
        }, 
        TableName: 'users',
    }
};