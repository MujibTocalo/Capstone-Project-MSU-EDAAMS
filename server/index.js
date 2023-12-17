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
import User from "./models/user.js";

// CONFIGURATION
const app = express();
const server = http.createServer(app);
dotenv.config();

// Middleware
app.use(cors());

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true
  },
});

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  let userTypes = [];

  try {
    const user = await User.findById(userId);

    if (user) {
      userTypes = user.userType || [];

      userTypes.forEach((type) => {
        socket.join(type); // Join a room for each user type the user has
      });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
  }

  socket.on('newDocument', (documentDetails) => {
    const { receiverType, ...restDetails } = documentDetails;

    if (receiverType && userTypes.includes(receiverType)) {
      // Emit the event to the specified userType room
      io.to(receiverType).emit('newDocument', restDetails);
    } else {
      console.warn('Invalid receiverUserType or user not in the specified type.');
    }
  });


  socket.on('deanEndorsedDocument', (documentDetails) => {
    const { receiverType, ...restDetails } = documentDetails;

    if (receiverType && userTypes.includes(receiverType)) {
      // Emit the event to the specified userType room
      io.to(receiverType).emit('deanEndorsedDocument', restDetails);
    } else {
      console.warn('Invalid receiverUserType or user not in the specified type.');
    }
  });

  socket.on('ovcaaEndorsement', (documentDetails) => {
    const { receiverType, ...restDetails } = documentDetails;

    if (receiverType && userTypes.includes(receiverType)) {
      // Emit the event to the specified userType room
      io.to(receiverType).emit('ovcaaEndorsement', restDetails);
    } else {
      console.warn('Invalid receiverUserType or user not in the specified type.');
    }
  });



  app.use("/assets", express.static(path.join(__dirname, "/assets")));

  app.use((req, res, next) => {
    console.log(req.path, req.method, res.json);
    next();
  });

  // ROUTES
  app.use("/document", documentRouter);
  app.use("/user", userRouter);

  const userFile = upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]);

  app.post("/user/register", userFile, register);

  socket.on('disconnect', () => {
    // Leave all rooms when the user disconnects
    userTypes?.forEach((type) => {
      socket.leave(type);
    });
  });
});

export { io };

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



// DATABASE CONFIGURATION
const PORT = process.env.PORT || 2300;


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
