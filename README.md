# Welcome to your CDK TypeScript project
This is a project for AWS CDK V2 development with TypeScript for a bastion host to access an existing RDS instance in the protected subnet.
* cdk.ts (typescript code) invoke the cdk-stack.ts and setup the environment (i.e. account and region)
* cdk-stack.ts (typescript code) create the bastion ec2/host on the existing VPC and public subnet, using an existing security group & individual key pair to save on resources, so that multiple developers will not need to duplicate these resources. The code can be extended to create individual bastion host for the developers.
For ease of use, the code can also be extended to take in the parameters for the existing environment instead of hardcoding. The code can also be extended to use SSM Session Manager to connect to the bastion host instead of SSH using key pairs.

## The following is the log to set up the bastion host
* ec2-user:-/environment $ aws configure --profile bastion-cdk
* AWS Access Key ID [None]: ********************
* AWS Secret Access Key [None]: ***************************************
* Default region name [None]: ap-southeast-1
* Default output format [None]: 
* ec2-user:-/environment $ export AWS_PROFILE=bastion-cdk
* ec2-user:-/environment $ cdk --version
* 2.34.2 (build 7abcbc6)
* ec2-user:-/environment $ npm install -g typescript
* npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

* changed 1 package, and audited 2 packages in 2s

* found 0 vulnerabilities
* npm notice 
* npm notice New minor version of npm available! 8.11.0 -> 8.17.0
* npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.17.0
* npm notice Run npm install -g npm@8.17.0 to update!
* npm notice 
* ec2-user:~/environment $ tsc --version
* Version 4.7.4
* ec2-user:~/environment $ npm install -g ts-node
* npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

* added 19 packages, and audited 20 packages in 4s

* found 0 vulnerabilities
* ec2-user:~/environment $ ts-node --version
* v10.9.1
* ec2-user:~/environment $ npm install  aws-cdk-lib

* added 2 packages, and audited 24 packages in 7s

* found 0 vulnerabilities
* ec2-user:~/environment $ mkdir cdk3
* ec2-user:~/environment $ cd cdk3/
* ec2-user:~/environment/cdk3 $ git clone https://github.com/puileong/bastion2.git
* Cloning into 'bastion2'...
* remote: Enumerating objects: 39, done.
* remote: Counting objects: 100% (39/39), done.
* remote: Compressing objects: 100% (31/31), done.
* remote: Total 39 (delta 11), reused 24 (delta 2), pack-reused 0
* Receiving objects: 100% (39/39), 85.69 KiB | 6.12 MiB/s, done.
* Resolving deltas: 100% (11/11), done.
* ec2-user:~/environment/cdk3 $ cdk bootstrap aws://071355518544/ap-southeast-1 
* ⏳  Bootstrapping environment aws://071355518544/ap-southeast-1...
*Trusted accounts for deployment: (none)
* Trusted accounts for lookup: (none)
* Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
* ✅  Environment aws://071355518544/ap-southeast-1 bootstrapped (no changes).
****************************************************
*** Newer version of CDK is available [2.37.1]   ***
*** Upgrade recommended (npm install -g aws-cdk) ***
****************************************************

* ec2-user:~/environment/cdk3 $ cd bastion2/
* ec2-user:~/environment/cdk3/bastion2 (main) $ ls
* bin               cdk.json        lib           package-lock.json  test
* cdk.context.json  jest.config.js  package.json  README.md          tsconfig.json
* ec2-user:~/environment/cdk3/bastion2 (main) $ cdk diff
* Stack OneStack
* IAM Statement Changes
┌───┬──────────────────────────┬────────┬────────────────┬───────────────────────────┬───────────┐
│   │ Resource                 │ Effect │ Action         │ Principal                 │ Condition │
├───┼──────────────────────────┼────────┼────────────────┼───────────────────────────┼───────────┤
│ + │ ${ec2-readonly-role.Arn} │ Allow  │ sts:AssumeRole │ Service:ec2.amazonaws.com │           │
└───┴──────────────────────────┴────────┴────────────────┴───────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────┬───────────────────────────────────────────────────────────────┐
│   │ Resource             │ Managed Policy ARN                                            │
├───┼──────────────────────┼───────────────────────────────────────────────────────────────┤
│ + │ ${ec2-readonly-role} │ arn:${AWS::Partition}:iam::aws:policy/AmazonEC2ReadOnlyAccess │
└───┴──────────────────────┴───────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Parameters
[+] Parameter SsmParameterValue:--aws--service--ami-amazon-linux-latest--amzn2-ami-hvm-x86_64-gp2:C96584B6-F00A-464E-AD19-53AFF4B05118.Parameter SsmParameterValueawsserviceamiamazonlinuxlatestamzn2amihvmx8664gp2C96584B6F00A464EAD1953AFF4B05118Parameter: {"Type":"AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>","Default":"/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"}
[+] Parameter BootstrapVersion BootstrapVersion: {"Type":"AWS::SSM::Parameter::Value<String>","Default":"/cdk-bootstrap/hnb659fds/version","Description":"Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"}

Resources
[+] AWS::IAM::Role ec2-readonly-role ec2readonlyroleF5A115C2 
[+] AWS::IAM::InstanceProfile ec2-instance/InstanceProfile ec2instanceInstanceProfile9BCE9015 
[+] AWS::EC2::Instance ec2-instance ec2instance42082E81 

Other Changes
[+] Unknown Rules: {"CheckBootstrapVersion":{"Assertions":[{"Assert":{"Fn::Not":[{"Fn::Contains":[["1","2","3","4","5"],{"Ref":"BootstrapVersion"}]}]},"AssertDescription":"CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."}]}}


ec2-user:~/environment/cdk3/bastion2 (main) $ cdk deploy


✨  Synthesis time: 11.53s

This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬──────────────────────────┬────────┬────────────────┬───────────────────────────┬───────────┐
│   │ Resource                 │ Effect │ Action         │ Principal                 │ Condition │
├───┼──────────────────────────┼────────┼────────────────┼───────────────────────────┼───────────┤
│ + │ ${ec2-readonly-role.Arn} │ Allow  │ sts:AssumeRole │ Service:ec2.amazonaws.com │           │
└───┴──────────────────────────┴────────┴────────────────┴───────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────┬───────────────────────────────────────────────────────────────┐
│   │ Resource             │ Managed Policy ARN                                            │
├───┼──────────────────────┼───────────────────────────────────────────────────────────────┤
│ + │ ${ec2-readonly-role} │ arn:${AWS::Partition}:iam::aws:policy/AmazonEC2ReadOnlyAccess │
└───┴──────────────────────┴───────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)? 
Do you wish to deploy these changes (y/n)? y
OneStack: deploying...
[0%] start: Publishing c31e6c05001594d43abedb8672767261c18b95386d869c23ca91f99be04b4c03:071355518544-ap-southeast-1
[100%] success: Published c31e6c05001594d43abedb8672767261c18b95386d869c23ca91f99be04b4c03:071355518544-ap-southeast-1
OneStack: creating CloudFormation changeset...

 ✅  OneStack

✨  Deployment time: 203.72s

Stack ARN:
arn:aws:cloudformation:ap-southeast-1:071355518544:stack/OneStack/3cbd24f0-1920-11ed-b751-062e020cdc16

✨  Total time: 215.25s


ec2-user:~/environment/cdk3/bastion2 (main) $  

