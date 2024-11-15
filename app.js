const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connection to mongodb
const mongoUri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.set("view engine", "ejs");

  // routes
  app.use(require("./routes/index"));
  app.use(require("./routes/todo"));

  // server configurations
  app.listen(3000, () => console.log("Server started listening on port: 3000"));
});
