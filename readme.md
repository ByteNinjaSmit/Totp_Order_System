
# Operations with Innovative POS and TOTP Security Integration

In response to the dynamic restaurant landscape, we're set to revolutionize dining operations through an advanced Point of Sale (POS) system. Our focus is on elevating the customer experience, streamlining workflows, and bolstering security with Time-based One-Time Passwords (TOTP).


## Authors

- [@ByteNinjaSmit](https://github.com/ByteNinjaSmit)


## Installation

Clone the project
```bash
git clone https://github.com/ByteNinjaSmit/Totp_Order_System.git
```

Install client  with npm

```bash
cd client
    npm install 
```
Install server  with npm

```bash
cd server
    npm install 
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server folder

`MONGODB_URI`

`JWT_SECRET_KEY`


## Deployment Run

To run,  run the following command
for client side
```bash
cd client 
    npm run dev
```

for Server

```bash
cd server 
    npx nodemon server.js
```

## Tech Stack

**Client:** React, Redux, ReactBootstrap, CSS, BootStrap V5

**Server:** Node Js, Express, Socket.io, Mongodb, mongoose

![Logo](https://www.imaginarycloud.com/blog/content/images/2023/03/MERN.webp)

## Features

- Robust Authentication: Strengthen user authentication with TOTP.
- Dynamic Code Presentation: Display dynamic TOTP codes for visual confirmation of customer presence and enhanced security.
- Securing Customer Orders: Use TOTP during ordering to verify legitimacy and prevent unauthorized transactions.
- Seamless Integration: Ensure smooth TOTP integration with the POS system for a secure environment.
