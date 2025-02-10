### Flat Finder Server Side (Node)

## Technologies

- Server - Node, Express
- Database - MongoDB, Mongoose
- Test - Postman
- Security - JasonWebToken(JWT), Bcrypt.js

## User

### Get all users

Route: "/users"
Request: GET
Example:
![Get all users example](./images/getAllUsers.png)

### Get user by id

Route: "/users/:id"
Request: GET
Example:
![Get user by id example](./images/getUserById.png)

### Update user

Route: "/users/:id"
Request: PATCH
Example:
![Update user by id example](./images/updateUserById.png)

### Delete user

Route: "/users/register"
Request: DELETE
Example:
![Delete user by id example](./images/deleteUserById.png)

### Login

Route: "/users/login"
Request: POST
Example:
![Login user example](./images/userLogin.png)

### Register

Route: "/users/register"
Request: POST
Example:
![Register user example](./images/registerUser.png)

## Flat

### Get all flats

Route: "/flats"
Request: GET
Example:
![Get all flats example](./images/getFlats.png)

### Update flat

Route: "/flats/:id"
Request: PATCH
Example:
![Update flat by id example](./images/updateFlatById.png)

### Delete flat

Route: "/flats/:id"
Request: DELETE
Example:
![Delete flat by id example](./images/deleteFlatById.png)

### Add flat

Route: "/flats"
Request: POST
Example:
![Add flat example](./images/addFlat.png)

### Get flat by id

Route: "/flats/:id"
Request: GET
Example:
![Get flat by id example](./images/getFlatById.png)

## Message

### Get all messages

Route: "/flats/:id/messages"
Request: GET
Example:
![Register user example](./images/getMessages.png)

### Get user messages

Route: "/flats/:id/messages/:senderId"
Request: GET
Example:
![Register user example](./images/getUserMessages.png)

### Add message

Route: "/flats/:id/messages"
Request: POST
Example:
![Register user example](./images/addMessage.png)
