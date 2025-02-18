const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("./cloudinaryConfig");
const userRoute = require("./routes/userRoute");
const entryRoute = require("./routes/entryRoute");
const cors = require("cors");

const app = express();
dotenv.config();

const port = process.env.PORT || 5500;

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected !!!");
});

connectdb();

app.get("/", (req, res) => {
  res.send("Hello coder, Server is working!!!");
});

//Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://santhosh-travel-log-app.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("common"));

app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinaryConfig.api_secret
  );
  res.json({ timestamp, signature });
});

//Router routes
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);

app.listen(port, () => {
  console.log("Server is running at" + port);
});
