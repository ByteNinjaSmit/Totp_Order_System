
# Operations with Innovative POS and TOTP Security Integration

In response to the dynamic restaurant landscape, we're set to revolutionize dining operations through an advanced Point of Sale (POS) system. Our focus is on elevating the customer experience, streamlining workflows, and bolstering security with Time-based One-Time Passwords (TOTP).


## Authors

- [@ByteNinjaSmit](https://github.com/ByteNinjaSmit)


<details>
<summary>Project Deatils Additionals</summary>
<br>

## Restaurant Modernizing Dining Operations with Innovative POS and TOTP Security Integration
Jan 2024 - Jul 2024
# Project Overview:
In response to the dynamic restaurant landscape, we're set to revolutionize dining operations through an advanced Point of Sale (POS) system. Our focus is on elevating the customer experience, streamlining workflows, and bolstering security with Time-based One-Time Passwords (TOTP).

**Key Components and Features:**

1.POS System Implementation :
 - Deploy a feature-rich POS system for optimized order management and payment processing. User-friendly interfaces ensure seamless interactions for both customers and staff.

2. Customer-Centric Tools :
 - Introduce online reservations, mobile ordering, and loyalty programs directly integrated into the POS. Enhance customer engagement, satisfaction, and loyalty through personalized experiences.

3. Financial Management Integration 
 - Develop robust reporting and analytics tools for informed decision-making. End-of-day financial summaries enhance financial management, providing a comprehensive overview of daily operations.

4. Security Enhancement with TOTP 
 - Integrate TOTP security features to fortify the authentication process. Dynamic TOTP code presentation at each table visually confirms customer presence, enhancing overall security.

Security Features of TOTP :
- Robust Authentication: Strengthen user authentication with TOTP.
- Dynamic Code Presentation: Display dynamic TOTP codes for visual confirmation of customer presence and enhanced security.
- Securing Customer Orders: Use TOTP during ordering to verify legitimacy and prevent unauthorized transactions.
- Seamless Integration: Ensure smooth TOTP integration with the POS system for a secure environment.

Project Goals and Outcomes
- Achieve operational efficiency through advanced POS functionalities.
- Enhance the customer experience with online tools and features.
- Fortify transaction security with TOTP, ensuring reliability.
</details>

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

To run this project, you will need to add the following environment variables to your .env file in the client folder

`VITE_APP_URI_API`

To run this project, you will need to add the following environment variables to your .env file in the server folder

`MONGODB_URI`

`JWT_SECRET_KEY`

`CORS_SERVER`


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

**Client:** React, Redux, TailwindCss

**Server:** Node Js, Express, Socket.io, Mongodb, mongoose

![Logo](https://www.imaginarycloud.com/blog/content/images/2023/03/MERN.webp)


## Documentation
How work it 
[Working Document ](https://www.scribd.com/document/750414427/Restaurant-TOTP-POS-System-in-Detail)

Why this 
[Document ](https://www.scribd.com/document/750418156/Operations-With-Innovative-POS-and-TOTP-Security-Integration)



## Features

- Robust Authentication: Strengthen user authentication with TOTP.
- Dynamic Code Presentation: Display dynamic TOTP codes for visual confirmation of customer presence and enhanced security.
- Securing Customer Orders: Use TOTP during ordering to verify legitimacy and prevent unauthorized transactions.
- Seamless Integration: Ensure smooth TOTP integration with the POS system for a secure environment.
