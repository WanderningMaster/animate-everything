# Animate everything

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.x.x
- Install [NPM](https://www.npmjs.com/) version 8.x.x
- Install [MySql](https://www.mysql.com/) (5.7)
- Install [Docker](https://www.docker.com)

# Getting started

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Install dependencies

```
cd animate-everything
npm install
```

- Setup env variables

```
1) Create .env directory in root folder for docker
2) Create .env file in ~/server/src/ folder

By the way i have been created .env.example files so you can use them or create your own .env files, as you wish)
```

- Build and run the project

```
1) npm i
2) npm run start:(server|client|transcoder)
3) You can run rabbitmq and database locally, but envs should match
or you can just run them in docker (npm run docker:up:debug:backend)
```

- API Document endpoints

  swagger Spec Endpoint : http://localhost:5001/api-docs

# Cloud

In this project i used cloudinary as media cloud : https://cloudinary.com/.

But you can modify cloud adapter and corresponding interface to replace it with firebase storage or s3 bucket.

# Docker

## Build and run project in docker

1. npm run docker:build - To build images
2. npm run docker:up or npm run docker:up:d to run project in detached mode

# TypeScript + Node

## Getting TypeScript

Add Typescript to project `npm`.

```
npm install -D typescript
```

## Project Structure

The folder structure of this app is explained below:

| Name    | Description        |
| ------- | ------------------ |
| **dir** | Contains something |

work on it later...

### NPM Scripts (run from the root folder)

| Npm Script     | Description                                |
| -------------- | ------------------------------------------ |
| `build:shared` | Build shared module                        |
| `start:server` | Runs server locally                        |
| `start:client` | Runs client locally                        |
| `docker:up`    | Runs project in dockers                    |
| `docker:up:d`  | Same that 'docker:up' but in detached mode |
| `docker:down`  | Remove all containers                      |

# ESLint rules

All rules are configured through `.eslintrc.yml`.

To find problems in your code

```
npm run lint
```
