# Bight Backend Prototype

### To run the server:

```bash
cp .env.example .env

# Edit .env to add connection URL for mongodb, port for the
# server to run on, and a secret for JWTs

# If yarn ins not already installed, install it with
npm install -g yarn

# install dependencies
yarn install

# to run in development mode (with nodemon)
yarn dev

# to run normally
yarn start
```

## API Docs

- Sign Up `POST /auth/signup`

  > Request body should contain parameters `user_name`, `user_email` and `password`
  > Response will have a JWT to be used for secured routes.

- Login `POST /auth/login`

  > Request body should contain parameters `user_email` and `password`
  > Response will have a JWT to be used for secured routes.

- List Users `GET /user` and `GET /users` (Secured route)

  > Request header must contain `Authorization` with value `Bearer <token>`.
  > Returns array of all users.

- User Profile `GET /user/profile` (Secured route)

  > Request header must contain `Authorization` with value `Bearer <token>`.

- List Chats `GET /user/chats` (Secured route)

  > Request header must contain `Authorization` with value `Bearer <token>`.
  > Returns array of all chats the user is a part of.

- Create Chat `POST /user/chats/new` (Secured route)

  > Request header must contain `Authorization` with value `Bearer <token>`.
  > Request body must contain `chat_to`, set to `_id` of the user to chat with.

- Send Message `POST /user/chats/<chatid>/send` (Seured route)
  > Request header must contain `Authorization` with value `Bearer <token>`.
  > Request body must contain `message_text`.
  > At the moment, will return the complete chat history after sending the message.

### Bakki documentation coming soon ...
