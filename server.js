const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./models/index");
const User = require("./models/User");

PORT = process.env.PORT || 5005;

// Middlewares
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes Middlewares
app.use("/api", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

initializeDatabase();

app.listen(PORT, function () {
  console.log(`Sevrer is running on ${PORT}`);
});
