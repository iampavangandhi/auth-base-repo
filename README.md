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
  
## Future tasks
1. Sign up via Google
1. Sign up via Facebook
