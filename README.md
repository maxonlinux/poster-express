# Poster Express
ExpressJS (TypeScript) + Mongoose backend for poster app that implements basic CRUD operations and authentication using JWT tokens.

## Preparation Instructions
`Node.js`, `npm`, `MongoDB` and `pm2` should be installed on your machine.

1. Clone this repository
2. Install all dependencies executing `npm install` in the project folder
3. Change the default settings in the `.env` file:
   - PORT: Any port
   - SECRET: Long string that is used by JWT authorization (Any string, make sure it is long enough and use special characters to make it more secure)
   - DB_URI: MongoDB URI
   - DEFAULT_ADMIN_USERNAME: Admin username
   - DEFAULT_ADMIN_PASSWORD: Admin password

## Running the Project

Execute `npm run start` in the project folder

## Deployment
You will have to install and properly setup HTTP server on your machine.

Run `pm2 start "npm run start" --name PosterAPI` in the project folder

To run your backend automatically after system start:
1. Run `pm2 startup`
2. Run `pm2 save`
