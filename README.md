### Flat Finder Server Side (Node)

## Technologies

- Server - Node, Express
- Database - MongoDB, Mongoose
- Test - Postman
- Security - JasonWebToken(JWT), Bcrypt.js

## Using Postman to Test API Requests

Postman is a tool that allows you to send HTTP requests to your API for testing. Follow these steps to make requests correctly.

### 1. Set up postman

1. Open Postman and create a new request.
2. Select the appropiate HTTP method (GET, POST, PATCH, DELETE, etc.).
3. Enter the API endpoint URL (e.g. http://localhost:3000/users).

### 2. Add Authorization Header (JWT)

For most requests, authentication is required using a JWT (JSON Web Token).

Go to the "Headers" tab.
Add a new key-value pair:
Key: Authorization
Value: Bearer <your-jwt-token>
(Replace <your-jwt-token> with a valid token obtained from the login response.)

## User

### Get all users

Route: "/users"
Request: GET
Example:
![Get all users example](./images/User/getAllUsers.png)

### Get user by id

Route: "/users/:id"
Request: GET
Example:
![Get user by id example](./images/User/getUserById.png)

### Update user

Route: "/users/:id"
Request: PATCH
Example:
![Update user by id example](./images/User/updateUserById.png)

### Delete user

Route: "/users/register"
Request: DELETE
Example:
![Delete user by id example](./images/User/deleteUser.png)

### Login

Route: "/users/login"
Request: POST
Example:
![Login user example](./images/User/userLogin.png)

### Register

Route: "/users/register"
Request: POST
Example:
![Register user example](./images/User/registerUser.png)

## Flat

### Get all flats

Route: "/flats"
Request: GET
Example:
![Get all flats example](./images/Flat/getFlats.png)

### Update flat

Route: "/flats/:id"
Request: PATCH
Example:
![Update flat by id example](./images/Flat/updateFlatById.png)

### Delete flat

Route: "/flats/:id"
Request: DELETE
Example:
![Delete flat by id example](./images/Flat/deleteFlatById.png)

### Add flat

Route: "/flats"
Request: POST
Example:
![Add flat example](./images/Flat/addFlat.png)

### Get flat by id

Route: "/flats/:id"
Request: GET
Example:
![Get flat by id example](./images/Flat/getFlatById.png)

## Message

### Get all messages

Route: "/flats/:id/messages"
Request: GET
Example:
![Register user example](./images/Message/getMessages.png)

### Get user messages

Route: "/flats/:id/messages/:senderId"
Request: GET
Example:
![Register user example](./images/Message/getUserMessages.png)

### Add message

Route: "/flats/:id/messages"
Request: POST
Example:
![Register user example](./images/Message/addMessage.png)
