# auth-base-repo

This repo contains a basic implementation of the following tasks:
1. User registeration / sign up
2. User login
3. Forgot / Reset Password
4. Signout
5. A simple JWT auth based API route ( /dashboard )

## Features

The above mentioned feature list is elaborated here:
  - User registeration / sign up
    - Required Fields:
      - full name
      - email id
      - password
  - User login
    - Required Fields:
      - email id
      - password
  - Forgot Password
    - Required Fields:
      - email id
  - Reset Password
    - Required Fields:
      - reset token ( prefilled )
      - email ( prefilled )
      - new password
      - confirm password
   - Dashboard
      - Required Fields:
        - valid JWT token containing user info

## Config Setup

#### Add following envs into the `config/config.env` file.

```bash
PORT=xxxx
DATABASE=xxxx
DATABASETEST=xxxx
SECRET=xxxx
```

## Build Setup

```bash
# install dependencies
npm install
```

```bash
# run in production
npm start

# run in development
npm run dev

# run test cases
npm test

# run jsdoc
npm run doc

# run linter
npm run linter
```

## Folder Structure

    .
    ├── 📁 config               # Config files
    ├── 📁 controllers          # Route controllers
    ├── 📁 docs                 # JSdoc output
    ├── 📁 middleware           # Express middlewares
    ├── 📁 models               # Mongoose models
    ├── 📁 public               # Public folder
    ├── 📁 routes               # Express routes
    └── 📁 test                 # Test files

## Postman Collection

Published link: [here](https://documenter.getpostman.com/view/8562745/TVRecpfs)

## Future tasks
1. Sign up via Google
1. Sign up via Facebook
