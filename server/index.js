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

// CONFIGURATION
const app = express();
dotenv.config();

// Middleware
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:7000"],
    credentials: true,
  })
);

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

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((error) => console.log(`${error} did not connect`));

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId })
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const httpServer = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    const io = new Server(httpServer, {
      cors: {
        origin: ["http://127.0.0.1:5173", "http://localhost:7000"],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {

      socket.on('onlineUser', (username) => {
        // Add the user to the onlineUsers list
        addNewUser(username, socket.id);
        console.log('User connected:', socket.id);
      });

      socket.on('disconnect', () => {
        // Remove the user from the onlineUsers list
        removeUser(socket.id);
        console.log('User disconnected:', socket.id);
      });


      socket.on('sendNotification', ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        if (receiver) {
          // Send the notification to the receiver
          io.to(receiver.socketId).emit('getNotification', {
            senderName,
            type,
          });
        }
      });

    });
  })
  .catch((error) => console.log(`${error} did not connect`));



