import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { register } from "./controllers/user.js";
import userRouter from "./routes/user.js";
import documentRouter from "./routes/document.js";
import { Server } from "socket.io";
import http from "http";

// CONFIGURATION
const app = express();
const server = http.createServer(app);
dotenv.config();


// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle events (if needed)

  // Example: Handle document creation event
  socket.on("createDocument", (newDocument) => {
    // Broadcast the new document to all connected clients
    io.emit("newDocument", newDocument);
  });
  // NOTIFICATION FOR DEAN ENDORSEMENT
  socket.on("deanEndorsement", (deanEndorsedDocument) => {
    // Broadcast the new document to all connected clients
    io.emit("deanEndorsedDocument", deanEndorsedDocument);
  });
  // NOTIFICATION FOR OVCAA ENDORSEMENT
  socket.on("endorsementDocument", (endorsedDocument) => {
    // Broadcast the new document to all connected clients
    io.emit("endorsedDocument", endorsedDocument);
  });

  socket.on("opApprovedDocument", (approvedDocument) => {
    // Broadcast the new document to all connected clients
    io.emit("approvedDocument", approvedDocument);
  });

  // Handle disconnect event (if needed)
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

// File upload configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "/assets");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use((req, res, next) => {
  console.log(req.path, req.method, res.json);
  next();
});

// ROUTES
app.use("/document", documentRouter);
app.use("/user", userRouter);
app.post("/user/register", upload.single("signature"), register);

// DATABASE CONFIGURATION
const PORT = process.env.PORT || 2300;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
