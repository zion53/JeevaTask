const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const uri = "mongodb+srv://mohitsharma55337:xPcXUardAWrOi7Du@cluster1.d3uimb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const formRouter = require("./routes/formRoutes");
app.use('/form', formRouter);
let db;

mongoose.connect(uri, clientOptions)
  .then((connection) => {
    console.log("Successfully connected to MongoDB!");
    db = connection.connection.db;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
