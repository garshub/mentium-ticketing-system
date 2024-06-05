# Ticket Support Platform

## Description
This is a ticket support platform similar to Zendesk. Clients will send emails to a support email address (mentiumcodechallenge@outlook.com). Each incoming email will be linked to an existing ticket if it belongs to a thread, or it will create a new ticket if it starts a new thread. They will receive an acknowledgment email. The user should be able to update the status & priority of a ticket, assign it to themselves and reply to the ticket directly from the dashboard. Application has an inbuilt ML model to suggest replies based on customer's last email.


## Technologies
- **Backend**: Typescript, Nest.js, Type ORM, Docker, Temporal.io (workflow scheduling), PostgreSQL, Numpy
- **Frontend**: React.js, Material UI, Vite.js

## Build Instructions:

- Start the server:
  - Start docker-compose:  `docker-compose up`
  - If this went well, you will have the following:
    - Postgres: [localhost:5432/](localhost:5432/)
    - Temporal: [localhost:8233/](localhost:8233/)
    - Server: [localhost:3000/](localhost:3000/)
    - Nlp: [localhost:5004/](localhost:5004/)

- Build email workflow:
  - Change directory `cd email-worker`
  - Install dependencies `npm i`
  - Compile Code: `npx tsc`
  - Run worker: `npm run start:worker`
  - Schedule workflow: `npm run start:schedule`
 
- Build Frontend:
  - Change directory to webapp:  `cd ./../webapp`
  - Install dependencies: `npm i`
  - Run: `npm run dev`
  - Front end will run on [localhost:5173/](localhost:5173/)

## Flow:

- SignIn using these credentials:
  - demo1@mentium.com // demo@1234
  - demo2@mentium.com // demo@1234

- or Create your own user using this curl command:
 `curl -X POST \
  http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email":"agent@mentium.com",
    "password":"demo@1234",
    "name":"Bart Simpson"
}'
`

- On successful login, you will see your Dashboard with all created tickets. Search with Ticket#, filter by ticket Status or Priority.
  
- Click on a ticket to view its details.
  - Send & Submit button will be disabled
  - Assign the ticket to yourself (Click on Assign to me) to enable buttons
  - Write a messag and click Send to send a rply to the customer.
  - Set Status & Priority and click Submit to update the ticket.


