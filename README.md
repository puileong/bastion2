# Welcome to your CDK TypeScript project
This is a project for AWS CDK V2 development with TypeScript for a bastion host to access an existing RDS instance in the protected subnet.
* cdk.ts (typescript code) invoke the cdk-stack.ts and setup the environment (i.e. account and region)
* cdk-stack.ts (typescript code) create the bastion ec2/host on the existing VPC and public subnet, using an existing security group & individual key pair to save on resources, so that multiple developers will not need to duplicate these resources. The code can be extended to create individual bastion host for the developers.
For ease of use, the code can also be extended to take in the parameters for the existing environment instead of hardcoding. The code can also be extended to use SSM Session Manager to connect to the bastion host instead of SSH using key pairs.

## The following is the log to set up the bastion host
*step 1 - set up the existing environment i.e. RDS, private subnet, RDS security group, VPC, public subnet, bastion security group, and key pairs
*step 2 - 
*step 3 - 

