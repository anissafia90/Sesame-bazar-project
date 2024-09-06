const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./config/database");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// Connect to MySQL
sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => {
    console.error("Error: " + err);
    process.exit(1); // Exit the process if the database connection fails
  });

sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error: " + err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
