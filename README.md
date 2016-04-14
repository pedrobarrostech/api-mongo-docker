# Node API [![Circle CI](https://circleci.com/gh/pedrobarrostech/api-mongo-docker.svg?style=svg)](https://circleci.com/gh/pedrobarrostech/api-mongo-docker)

[![Coverage Status](https://coveralls.io/repos/pedrobarrostech/api-mongo-docker/badge.svg?branch=master&service=github)](https://coveralls.io/github/pedrobarrostech/api-mongo-docker/?branch=master)

An example of a dockerized node API built with [hapijs](http://hapijs.com), [mongodb](https://www.mongodb.org/) and [mongoose](https://mongoosejs.com).

## Installation

```bash
$ npm install
```

## Development

Watch `*.js` files and restart the server.

```bash
$ node start
```

### Examples

Sample user request:

```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"name": "Peter Tosh", "password": "admin", "email": "peter@tosh.com"}' http://localhost:9001/user
```

## Tests

```bash
$ npm test
```

## Coverage

```bash
$ npm run coverage
```

## Lint

Run [ESLint](http://eslint.org/)

```bash
$ npm run lint
```

## Docker

Install [Docker](https://docs.docker.com/installation/#installation) and [Compose](https://docs.docker.com/compose/install/#install-compose)

Start docker and run:

```bash
$ docker-compose up
```

## Continuous Integration

With [CircleCI](https://circleci.com/), see [circle.yml](circle.yml)

Build url: https://circleci.com/gh/pedrobarrostech/api-mongo-docker
