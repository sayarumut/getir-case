# Getir Case

A sample REST API application which is built using Node.js and Express.js. The application has only one endpoint that connects to a MongoDB database for fetching records.

The structure of the application is based on MVC pattern.

## Test URL

```
http://ec2-54-160-116-197.compute-1.amazonaws.com:3000
```

## Prerequisites

For running and deploying the application, you need:

- [NodeJS](https://nodejs.org/en/blog/release/v12.18.3/)
- [MongoDB](https://www.mongodb.org/) - A running instance
- [AWS Account] - For deployment
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) - For deployment

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [jest](https://www.npmjs.com/package/jest)
- [mockingoose](https://www.npmjs.com/package/mockingoose)
- [axios](https://www.npmjs.com/package/axios)
- [cors](https://www.npmjs.com/package/cors)
- [supertest](https://www.npmjs.com/package/supertest)

## Endpoints

### POST /records

Fethes data in the provided MongoDB collection and return the results

**Headers**

Content-Type : application/json

**Request body**

```
{
	"startDate": "2015-12-07",
	"endDate": "2016-12-09",
	"minCount": 48,
	"maxCount": 500
}
```

**Response body**

```
{
	"code": 0,
	"msg": "Success",
	"records": [
		{
			"key": "GRLbHIEk",
			"createdAt": "2016-08-03T23:58:00.940Z",
			"totalCount": 49
		},
		{
			"key": "nVSJettm",
			"createdAt": "2016-11-01T21:30:20.519Z",
			"totalCount": 49
		},
		{
			"key": "nbHWbcgs",
			"createdAt": "2016-02-22T11:10:15.071Z",
			"totalCount": 49
		},
		{
			"key": "pNvFKzlw",
			"createdAt": "2016-10-29T23:19:58.642Z",
			"totalCount": 49
		}
	]
}
```

## Demo Data

You can import **records.json** to your database.

## Running the application locally

In order to run the application locally, you should create a .env file.

```shell
PORT=3000
DB_URI=mongodb://localhost:27017
DB_NAME=getir-case-study
NODE_ENV=development
```

After creating the file, you should run the commands below.

```shell
npm install
node start.js
```

## Test

The command below can be used to run the tests which are written using [Jest](https://www.npmjs.com/package/jest)

```shell
npm test -- -u
```

**Coverage**

```
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |   70.53 |       60 |      48 |   74.44 | 
 Code                    |   41.67 |        0 |   18.75 |   46.51 | 
  app.js                 |     100 |      100 |     100 |     100 | 
  init-db-connection.js  |      70 |      100 |      40 |     100 | 
  start.js               |       0 |        0 |       0 |       0 | 1-35
 Code/controller         |     100 |      100 |     100 |     100 | 
  record-controller.js   |     100 |      100 |     100 |     100 | 
 Code/helper             |     100 |      100 |     100 |     100 | 
  api-response-helper.js |     100 |      100 |     100 |     100 | 
 Code/model              |     100 |      100 |     100 |     100 | 
  record-model.js        |     100 |      100 |     100 |     100 | 
 Code/route              |     100 |      100 |     100 |     100 | 
  record-router.js       |     100 |      100 |     100 |     100 | 
 Code/service            |     100 |      100 |     100 |     100 | 
  record-service.js      |     100 |      100 |     100 |     100 | 
 Code/validator          |     100 |      100 |     100 |     100 | 
  record-validator.js    |     100 |      100 |     100 |     100 | 
-------------------------|---------|----------|---------|---------|-------------------

Test Suites: 6 passed, 6 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        6.326 s
Ran all test suites.
```

## Deployment

The application can be deployed with a single command which runs a cloud formation template on AWS. You should install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and configure **aws_access_key_id** and **aws_secret_access_key** of your aws account, before deployment.

**\.aws\configuration**
```shell
[default]
aws_access_key_id=*********
aws_secret_access_key=*********
```

The template creates two resources;

* EC2 instance - to run application
* Security group - to allow traffic to instance with the help of inbound/outbound rules

The template has an initial configuration section of EC2 instance which is called [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html). This section contains all the required configuration and deployment commands in it. After setting your DB_URI in **cloud_formation_template.json**, you can run the following command to make deployment;

```shell
aws cloudformation deploy --template-file .\cloud_formation_template.json --stack-name getir-case
```

After the deployment, you can use **Public DNS (IPv4)** of newly created EC2 instance(with port :3000) or **ApplicationURL** output of newly created CloudFormation stack as REST API URL.
