const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

//Import Routes
const postsRoutes = require("./routes/posts");
app.use("/posts", postsRoutes);

//ROUTES
app.get("/", (req, res) => {
  res.send(req.url);
});

//Connect to DataBase
mongoose.connect(
  process.env.MONGODB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB")
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
