# Ticket Support Platform

## Description
This is a ticket support platform similar to Zendesk. Clients will send emails to a support email address (mentiumcodechallenge@outlook.com). Each incoming email will be linked to an existing ticket if it belongs to a thread, or it will create a new ticket if it starts a new thread. They will receive an acknowledgment email. The user should be able to update the status & priority of a ticket, assign it to themselves and reply to the ticket directly from the dashboard. 


## Technologies
- **Backend**: Typescript, Nest.js, Type ORM, Docker, Temporal.io (workflow scheduling), PostgreSQL
- **Frontend**: React.js, Material UI, Vite.js

## Build Instructions:

- Start the server:
  - Start docker-compose:  `docker-compose up`
  - If this went well, you will have the following:
    - Postgres: [localhost:5432/](localhost:5432/)
    - Temporal: [localhost:8233/](localhost:8233/)
    - Server: [localhost:3000/](localhost:3000/)

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
 
    
