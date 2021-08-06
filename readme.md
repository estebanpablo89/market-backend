# Market backend

Country and currency CRUD with AWS and Fastify

## Documentation

- [Swagger](https://app.swaggerhub.com/apis/estebanpablo/Markets-backend/1)

- [Postman](https://documenter.getpostman.com/view/724536/TzeXkT81)

## Installation

Use [npm](https://nodejs.org/en/) package manager to install dependencies

```bash
npm i
```
Install and configure [serverless](https://www.serverless.com/)

## Usage

Change example.env to .env and fill MongoDB URI

Deploy server
```bash
serverless deploy
```

Deploy server locally and run tests

```bash
serverless offline
npm test
```
## Used technologies
- Fastify as web framework
- Serverless for deployment with AWS lambda functions
- MongoDB as document database
- Mocha as testing framework
- Chai for assertions
- Swagger and Postman for documentation
