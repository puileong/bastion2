#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { OneStack } from '../lib/cdk-stack';

const envSingapore = { account: '071355518544', region: 'ap-southeast-1' };
const app = new cdk.App();
new OneStack(app, 'OneStack',{env: envSingapore});