# Animate everything

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.x.x
- Install [NPM](https://www.npmjs.com/) version 8.x.x
- Install [PostgreSQL](https://www.postgresql.org/) (14.0)
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
2) npm run start  
```

- API Document endpoints

  swagger Spec Endpoint : http://localhost:5001/api-docs

# TypeScript + Node

## Getting TypeScript

Add Typescript to project `npm`.

```
npm install -D typescript
```

## Project Structure

The folder structure of this app is explained below:

| Name    | Description        |
|---------|--------------------|
| **dir** | Contains something |

work on it later...

### NPM Scripts (run from the root folder)

| Npm Script     | Description                                |
|----------------|--------------------------------------------|
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

