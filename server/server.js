require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminAuthMiddleware = require('./middlewares/io-admin-middleware'); // Import io-admin middleware
const { startTotpInterval, startOrderBroadcast,startContactBroadcast } = require("./controllers/admin-controller");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "HEAD", "PUT"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

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
