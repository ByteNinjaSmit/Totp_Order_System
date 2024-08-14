require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const userRoute  =require("./router/user-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminAuthMiddleware = require('./middlewares/io-admin-middleware'); // Import io-admin middleware
const { startTotpInterval, startOrderBroadcast,startContactBroadcast } = require("./controllers/admin-controller");
const bodyParser = require('body-parser');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_SERVER,
    methods: ["GET", "POST", "DELETE", "PATCH", "HEAD", "PUT"],
    credentials: true,
  },
});

app.use(cors({ origin: process.env.CORS_SERVER, credentials: true }));
app.use(express.json());
// app.use(bodyParser.json({ limit: '10mb' })); // Example limit
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user",userRoute);

app.use(errorMiddleware);

// WebSocket middleware for admin operations
io.use((socket, next) => adminAuthMiddleware(socket, next));

// Start TOTP generation and emit updates
startTotpInterval(io);

// Start broadcasting orders
startOrderBroadcast(io);

// Start Broadcasting Contacts
startContactBroadcast(io);

const PORT = 5000;

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
