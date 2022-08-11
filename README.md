# Welcome to your CDK TypeScript project
This is a project for CDK V2 development with TypeScript for a bastion host to access an existing RDS instance in the protected subnet.
* cdk.ts (typescript code) invoke the cdk-stack.ts and setup the environment (i.e. account and region)
* cdk-stack.ts (typescript code) create the bastion ec2 host with on the existing VPC and public subnet, an existing security group & individual key pair to save on resources, so that multiple developers will not need to duplicate these resources. The code can be extended to create individual bastion host for the developers.

## The following is the log to set up the bastion host
*1 set up the existing environment i.e. RDS, private subnet, RDS security group, VPC, public subnet, bastion security group, and key pairs
* 

