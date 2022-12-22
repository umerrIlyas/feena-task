# Feena Task

## Setup

- Clone the project
- Make sure you are not running anything on PORT 3000, 5000 and 6379
- In the root directory of the project, run `docker-compose up`
- It might take a few seconds for the containers to start
- Once all the containers are up, you can access the app on `http://localhost:3000` to access the frontend
- You can access the swagger api on `http://localhost:5000/swagger`

## Testing

- On the UI you can create a new email campaign with the number of emails you want to send using the form
- Once the campaign is created, you can see the status of the campaign on the dashboard in real-time
- You can also see the status of the campaign on the swagger api