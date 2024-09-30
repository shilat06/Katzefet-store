require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
      dbName: process.env.MONGO_DB_NAME,
      collectionName: "sessions",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

mongoose
  .connect(
    `${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error", err));

const appRouter = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", appRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
