# challenge-plink

challenge-plink

## First steps

#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies
Run ```npm install``` or ```yarn``` from rootpath of the project.


#### Database configuration
Before running the app, make sure you have [postgresql installed](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04) and a db created, to create it run the following steps inside a psql terminal:
1. CREATE DATABASE db_project_name;
2. \c db_project_name
3. CREATE ROLE "project_name" LOGIN CREATEDB PASSWORD 'project_name';

Then, set in `.env` some variables:
- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=project_name
- DB_PASSWORD=project_name
- DB_NAME_DEV=db_project_name_dev
- DB_NAME_TEST=db_project_name_test
- BCRYPT_SALT=10
- SECRET=xxx
- PORT=8080
- EXPIRATION=7200
- EXPIRATION_TEST=1
- APIBRAVENEWCOIN=https://bravenewcoin-v1.p.rapidapi.com/
- APIKEY=7945704872msh114c172508acb06p1e72a2jsn079200953c54

### Migrations

To create a migration, run `./node_modules/.bin/sequelize migration:create --name="my-migration-name" --config ./migrations/config.js --migrations-path ./migrations/migrations`.

To run them, execute `npm run migrations`.

#### Starting your app
Now, to start your app run ```npm start``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.
