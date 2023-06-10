# Roundforest home assignment - Backend


 This backend project is a part of home assignment.
 The tech stach is: Node, Express, express-validators, Knex, Jest, Postgres, docker-compose
 After running the backend please run the Fronted project as well.




## Run instructions

1 - Clone the repo

2 - At the root level run "npm i"

3 - For running the postgres DB on docker-compose run "docker-compose up"

4 - After the DB instance will be created we'll run the migration and seed files
    4.1 - cd ./db/
    4.2 - npm run migration

5 - After creating the DB, we'll start the server by "npm run start:dev"

6 - Extra - run the jest tests "npm run test"
