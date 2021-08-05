# Market backend

Country and currency CRUD with AWS and Fastify

## Documentation

- [Swagger](https://app.swaggerhub.com/apis/estebanpablo/Markets-backend/1)

- [Postman](https://documenter.getpostman.com/view/724536/TzeXkT81)

## Installation

Use the package manager [node](https://nodejs.org/en/) to install dependencies

```bash
npm i
```
Install and configure [serverless](https://www.serverless.com/)

## Usage

Change example.env to .env and complete MongoDB URI

Deploy server
```bash
serverless deploy
```

Deploy server locally and run tests

```bash
serverless offline
npm test
```
## Used
- Fastify for logic and end points
- Serverless for deployment with AWS lambda functions
- MongoDB for data persistence
- Mocha as testing framework
- Chai for assertions
