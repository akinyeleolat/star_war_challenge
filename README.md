[![Build Status](https://travis-ci.com/akinyeleolat/nodejs-starter.svg?token=cwN91MVvrFcs3q4Up8px&branch=main)](https://travis-ci.com/akinyeleolat/nodejs-starter)
# StarWars Challenge
Modified Star wars Api


# Application Details

## Technologies
Currently,
<ul>
<li>NodeJs </li>
<li>ExpressJs</li>
<li>Sequelize: Database ORM</li>
<li>PostgreSQL Database</li>
<li>Sqlite</li>
<li>Mocha Chai</li>
  </ul>

## Application Set up
Enviroment variables are set in `.env` files and the examples can be seen in `env.examples`.

1. Create `.env` files in the root folder, and set the correct environment variables as stated in `env.examples`
2. Open terminal and navigate to the root folder.
3. Install all dependencies and also set up the `database` and `database migration` by running this command on the terminal
4. Additional migration can be created `NAME=name_of_migration npm run create-migration`

    ```
    - npm install
    - npm run migration
    - npm run seed
    ```

## Running the App (Development)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal
```
    npm run dev
```
## Running the App (Production Instance)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal
```
    - npm start
```


## Running the App (Unit testing)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal
```
    - npm test
```

## API Documentation ( Sample)
The API documentation can be seen on (https://documenter.getpostman.com/view/5081938/UVC8C5hJ)

Application url: ```https://starwars-ap.herokuapp.com```

[comment]: <> (## API Endpoint Route)

[comment]: <> (Currently,)

[comment]: <> (<table>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>HTTP VERB</td>)

[comment]: <> (    <td>ENDPOINT</td>)

[comment]: <> (    <td>TASK</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>POST</td>)

[comment]: <> (    <td>/auth/login</td>)

[comment]: <> (    <td>Login to the application with email and password</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>GET</td>)

[comment]: <> (    <td>/cars</td>)

[comment]: <> (    <td>Get all the available cars. This without specifying limit and page will only return first 10 cars</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>GET</td>)

[comment]: <> (    <td>cars/?limit=2&page=1</td>)

[comment]: <> (    <td>Get all availble cars with page and limit set as query  params.)

[comment]: <> (</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>POST</td>)

[comment]: <> (    <td>/booking</td>)

[comment]: <> (    <td>Book a car by supplying the carId for currently logged in users</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>GET</td>)

[comment]: <> (    <td>/booking/user</td>)

[comment]: <> (    <td>Get all the available bookings for current users. This without specifying limit and page will only return first 10 bookings</td>)

[comment]: <> (  </tr>)

[comment]: <> (  <tr>)

[comment]: <> (    <td>GET</td>)

[comment]: <> (    <td>/booking/user/?limit=2&page=1</td>)

[comment]: <> (    <td>Get all availble bookings for current users with page and limit set as query  params.)

[comment]: <> (</td>)

[comment]: <> (  </tr>)

[comment]: <> (  </table>)
