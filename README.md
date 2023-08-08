# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com).

## Downloading

```
git clone https://github.com/AliaksandrPatapeika/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

Rename the .env.example file to .env and make sure to configure it with the correct database connection details before running the application or database management scripts.

To start the application, first, make sure you have Docker installed and running. Then, in your terminal, run:

```
npm run docker
```

This command will start the application inside a Docker container. After starting the application on port (4000 as default), you can open the OpenAPI documentation in your browser by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger, please visit https://swagger.io/.

## Database Management

Before running the commands below, you need to open the terminal inside the Docker container:

```
npm run docker:sh
```

### Generate Database Migration

```
npm run db:generate
```

This will generate a new migration file in the `src/db/migration/` directory.

### Start Database Migration

```
npm run db:start
```

This will execute all pending migrations and apply them to the database.

### Rollback Database Migration

```
npm run db:rollback
```

This will revert the last applied migration.

### Drop Database

```
npm run db:drop
```

Caution: This will drop the entire database schema and delete all data and cannot be undone.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Scan docker images for security vulnerabilities

### Scan all docker images

```
npm run scan:all
```

### Scan application docker image

```
npm run scan:application
```

### Scan database docker image

```
npm run scan:database
```
