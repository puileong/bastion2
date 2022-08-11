import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class OneStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // 👇 import VPC by ID
    const vpc = ec2.Vpc.fromLookup(this, 'external-vpc', {
      vpcId: 'vpc-05e4ed787044995b5',
    });
    
        // 👇 import security group by ID
    const bastionSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'SG', 'sg-094637113850ab747', {
       mutable: false
    });


        // 👇 create a Role for the EC2 Instance
    const ec2ReadOnlyRole = new iam.Role(this, 'ec2-readonly-role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ReadOnlyAccess'),
      ],
    });
    
    // 👇 create the EC2 Instance
    const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
      vpc,
      vpcSubnets: {
        availabilityZones: ['ap-southeast-1b'],
        },
      role: ec2ReadOnlyRole,
      securityGroup: bastionSecurityGroup,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'lokeec2',
    });
      }
}

