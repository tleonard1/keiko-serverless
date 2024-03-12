import { tableArn, userTableArn } from '..';

export const nftTableDynamoDBReadPolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:GetItem', 'dynamodb:Query'],
};

export const nftTableDynamoDBWritePolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:PutItem', 'dynamodb:Query'],
};

export const nftTableDynamoDBDeletePolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:DeleteItem'],
};

export const userTableDynamoDBReadPolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:GetItem', 'dynamodb:Query'],
};

export const userTableDynamoDBWritePolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:PutItem', 'dynamodb:Query'],
};

export const userTableDynamoDBDeletePolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:DeleteItem'],
};
