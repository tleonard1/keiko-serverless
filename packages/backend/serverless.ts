import { AWS } from '@serverless/typescript';

import { resources, tableName } from './resources';
import { functions } from './functions';

const projectName = 'keiko-serverless';

const serverlessConfiguration: AWS = {
  service: `${projectName}`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  configValidationMode: 'error',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-better-credentials',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    region: 'eu-west-1',
    profile: '${env:AWS_PROFILE}', // Used to point to the right AWS account
    stage: "${opt:stage, 'dev'}", // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NFT_TABLE_NAME: tableName,
    },
    httpApi: {
      payload: '2.0',
      cors: {
        allowedOrigins: ['http://localhost:3000'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
        allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowCredentials: true,
      },
      metrics: true,
    },
  },
  functions,
  package: { individually: true },
  custom: {
    projectName,
    esbuild: {
      packager: 'pnpm',
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      platform: 'node',
      mainFields: ['module', 'main'],
      concurrency: 5,
    },
  },
  resources,
};

module.exports = serverlessConfiguration;
