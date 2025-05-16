# Node.js Backend Assignment
This project is a RESTful API built with **Node.js**, **TypeScript**, and **MongoDB**, using only the dependencies specified in the assignment.
## Tech Stack
- Node.js (built-in `http` module)
- TypeScript
- MongoDB (`mongodb` driver)
## Project Structure
node_assignment/
├── controllers/
├── models/
├── routes/
├── services/
├── types/
├── utils/
├── index.ts
├── tsconfig.json
├── package.json

## Setup Instructions
### 1.Install Dependencies
npm install
### 2. Start the Server
npx ts-node index.ts
Make sure MongoDB is running locally on `mongodb://localhost:27017`
## Available Endpoints

### Load Dummy Data
```
GET /load
Fetches 10 users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), along with their posts and comments, and stores them in MongoDB.
---
### Get All Users
```
GET /users
```
Returns all users with their posts and comments.
---
### Get Specific User
```
GET /users/:userId
```
Returns a user with nested posts and comments.
---
### Add New User
```
PUT /users
```
Creates a new user. Returns `409 Conflict` if the user ID already exists.
**Request Body Example:**
```json
{
  "id": 11,
  "name": "Jane Doe",
  "username": "jdoe",
  "email": "jane@example.com",
  "address": {
    "street": "Main St",
    "suite": "Apt. 1",
    "city": "Metropolis",
    "zipcode": "12345",
    "geo": { "lat": "0.0", "lng": "0.0" }
  },
  "phone": "123-456-7890",
  "website": "janesite.com",
  "company": {
    "name": "Jane Inc.",
    "catchPhrase": "We innovate",
    "bs": "tech"
  }
}
```
---

### Delete All Users
```
DELETE /users
```
Deletes all users from the database.
---

### Delete Specific User
```
DELETE /users/:userId
```
Deletes a single user by ID.
---
##Status Codes
| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Resource Created |
| 204  | No Content |
| 404  | Resource Not Found |
| 409  | Conflict (e.g., Duplicate user ID) |
| 500  | Internal Server Error |
